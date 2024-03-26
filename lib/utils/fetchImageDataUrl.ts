export async function fetchImageDataUrl(url: string) {
    const res = await fetch(url);
    return `data:${res.headers.get("content-type")};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
}
