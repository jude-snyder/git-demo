export async function getFact(): Promise<string> {
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
        console.error("Unable to fetch", response.status, response.statusText);
        process.exit(1);
    }

    console.log(await response.json());

    return "";
}

await getFact();