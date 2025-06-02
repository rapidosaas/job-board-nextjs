import { formatDistanceToNowStrict } from "date-fns";

export function formatMoney(amount: number, currency: string = "EUR") {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    } else if (currency === "DZD") {
      return new Intl.NumberFormat("fr-DZ", {
        style: "currency",
        currency: "DZD",
      }).format(amount);
    } else {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    }
  }
  
  export function relativeDate(from: Date) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  }
  
  export function toSlug(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }