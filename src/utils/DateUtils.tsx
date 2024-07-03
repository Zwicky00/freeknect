export function getUtcDateTime() {
    const now = new Date();
    const utcString = now.toUTCString();
    return utcString;
}