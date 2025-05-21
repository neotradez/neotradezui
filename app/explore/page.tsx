import { redirect } from "next/navigation"

export default function ExplorePage() {
  // Redirect to marketplace since we're consolidating these pages
  redirect("/marketplace")
}
