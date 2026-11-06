import StudioClient from "./StudioClient";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="studio-setup">
        <p className="overline">MARINE NOTES / EDITOR</p>
        <h1>编辑后台尚未连接。</h1>
        <p>网站仍可正常阅读。把 Sanity 项目 ID 和数据集名称填写到本地与 Vercel 的环境变量，再重新部署，就能在这里登录写作。</p>
        <p>只需公开的项目 ID；不要把登录密码或 API Token 写进代码。</p>
      </div>
    );
  }

  return <StudioClient />;
}
