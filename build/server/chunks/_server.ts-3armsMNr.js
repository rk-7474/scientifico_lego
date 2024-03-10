async function POST({ request }) {
  const imageUrl = await request.text();
  if (!imageUrl) {
    return new Response(null, { status: 400 });
  }
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new Response(null, { status: response.status });
    }
    const contentType = response.headers.get("content-type");
    if (!contentType?.startsWith("image/")) {
      return new Response(null, { status: 400 });
    }
    const imageData = await response.blob();
    return new Response(imageData, {
      headers: {
        "Content-Type": contentType
      }
    });
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    return new Response(null, { status: 500 });
  }
}

export { POST };
//# sourceMappingURL=_server.ts-3armsMNr.js.map
