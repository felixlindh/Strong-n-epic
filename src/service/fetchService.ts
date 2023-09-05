

export default function fetchOptions<T>(METHOD: string, BODY: T) {
    const fetchOptions = {
        method: METHOD,
        body: JSON.stringify(BODY),
        headers: {
            "Content-Type": "application/json",
          }
    }

    return fetchOptions
}