export function statusColour(status: string | undefined | null): string {
    if (status == "Nominal") {
        return "green";
    } else if (status == "Moderate") {
        return "yellow";
    } else if (status == "Critical") {
        return "red";
    } else {
        return "gray";
    }
}
