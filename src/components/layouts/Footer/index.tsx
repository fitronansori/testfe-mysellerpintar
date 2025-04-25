import Logo from "@/components/common/blog-logo";

const Footer = () => {
  return (
    <div className="h-[96px] bg-primary flex flex-col sm:flex-row items-center justify-center gap-2 text-white">
      <Logo typeLogo="white" />
      <p>&copy; Blog genzet. All rights reserved.</p>
    </div>
  );
};
export default Footer;
