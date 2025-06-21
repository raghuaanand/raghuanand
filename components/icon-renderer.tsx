import { FaGithub, FaLinkedin, FaWhatsapp, FaCode, FaServer, FaTools } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  MdEmail,
  FaCode,
  FaServer,
  FaTools,
};

export const IconRenderer = ({ iconName, className }: IconRendererProps) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  
  if (!Icon) {
    return null;
  }
  
  return <Icon className={className} />;
};

export default IconRenderer;
