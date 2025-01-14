import { formatDistanceToNowStrict } from "date-fns";

export function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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