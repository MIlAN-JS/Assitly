import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function embedCode(botId)  { 
  return `<script
  src="http://localhost:3000/assistlyWidget.js"
  botId=${botId}
></script>`;
}