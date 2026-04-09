// server/utils/generateTicketNumber.js
export function generateTicketNumber() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(100 + Math.random() * 900);
    return `INQ-${yyyy}${mm}${dd}-${rand}`;
}