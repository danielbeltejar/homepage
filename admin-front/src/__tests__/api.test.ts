import { api, setToken, getToken } from "@/lib/api";
import { vi } from "vitest";

describe("api token management", () => {
  afterEach(() => {
    setToken(null);
    vi.restoreAllMocks();
  });

  it("getToken returns null initially", () => {
    expect(getToken()).toBeNull();
  });

  it("setToken / getToken round-trips", () => {
    setToken("abc");
    expect(getToken()).toBe("abc");
  });

  it("setToken(null) clears the token", () => {
    setToken("abc");
    setToken(null);
    expect(getToken()).toBeNull();
  });
});

describe("api.login", () => {
  afterEach(() => {
    setToken(null);
    vi.restoreAllMocks();
  });

  it("returns access_token on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ access_token: "tok", token_type: "bearer" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const result = await api.login("admin", "pass");
    expect(result.access_token).toBe("tok");
  });

  it("throws on invalid credentials", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ detail: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    );

    await expect(api.login("bad", "creds")).rejects.toThrow();
  });
});

describe("api.listPosts", () => {
  afterEach(() => {
    setToken(null);
    vi.restoreAllMocks();
  });

  it("sends Authorization header when token is set", async () => {
    setToken("mytoken");
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ posts: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await api.listPosts();

    const call = vi.mocked(fetch).mock.calls[0];
    const headers = call[1]?.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer mytoken");
  });
});

describe("api.deletePost", () => {
  afterEach(() => {
    setToken(null);
    vi.restoreAllMocks();
  });

  it("handles 204 No Content response", async () => {
    setToken("tok");
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 204 })
    );

    const result = await api.deletePost("test.md");
    expect(result).toBeUndefined();
  });
});
