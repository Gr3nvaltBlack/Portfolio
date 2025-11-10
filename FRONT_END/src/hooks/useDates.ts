export const formatDate = (dateString: string): string => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    let timestamp: number = Date.parse(dateString);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options as any);
    return date.toString(); 
}