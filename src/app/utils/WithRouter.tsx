import { useRouter, useSearchParams } from "next/navigation";

export function withRouter(Child: any) {
  return (props: any) => {
    const params = useSearchParams();
    const router = useRouter();
    return <Child {...props} params={params} router={router} />;
  };
}
