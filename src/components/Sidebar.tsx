import { UserPlate } from "./UserPlate";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const checkPathname = (path: string) => path === router.pathname;
  const pages = [
    { url: "/my/drafts", name: "drafts" },
    { url: "/my/waiting-review", name: "waiting-review" },
    { url: "/my/needs-corrections", name: "needs-corrections" },
    { url: "/my/published", name: "published" },
  ];
  return (
    <div className="flex flex-col justify-between h-screen px-4 pt-8 pb-4 bg-darkCharcoal min-w-max">
      <div className="text-spanishGray text-lg">
        <nav>
          <ul className="flex flex-col">
            {pages.map((p) => (
              <li
                className={`cursor-pointer py-1 px-2 rounded mb-1 ${
                  checkPathname(p.url) && "text-white"
                } ${checkPathname(p.url) && "bg-outerSpace"}
                ${!checkPathname(p.url) && "hover:bg-arsenic"}`}
                key={p.name}
              >
                <Link href={p.url}>
                  <span># {p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <UserPlate />
    </div>
  );
}
