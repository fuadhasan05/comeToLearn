import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Default styles for the primary look
const BASE_CLASSES = "font-bold rounded-md transition-all duration-300 transform flex items-center justify-center gap-2";

export default function Button({
  children,
  href, // Optional: for Next.js internal linking
  external = false, // Set to true for <a> tags (external or full refresh)
  className = '', // For overriding or adding custom Tailwind classes
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'destructive'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  icon: Icon = ArrowRight, // Custom icon component from lucide-react (defaults to ArrowRight)
  iconPosition = 'right', // 'left' or 'right'
  ...props // Allows passing native button props like onClick, type, disabled
}) {

  // --- 1. Define Sizing ---
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }[size] || 'px-6 py-3 text-base';

  // --- 2. Define Variants (Colors/Styles) ---
  const variantClasses = {
    primary: "bg-red-700 hover:bg-red-600 rounded-md text-white hover:scale-[1.03]", 
    secondary: 'bg-black hover:bg-gray-800 text-white hover:scale-[1.03]',
    ghost: 'bg-white hover:bg-gray-300 text-black rounded-md border border-transparent hover:scale-[1.03]',
    destructive: 'bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-[1.03]', // Use for warnings/promotions
  }[variant] || PRIMARY_CLASSES;
  
  const finalClasses = `${BASE_CLASSES} ${sizeClasses} ${variantClasses} ${className}`;

  // --- 3. Determine Content Order ---
  const content = (
    <>
      {iconPosition === 'left' && <Icon size={20} />}
      <span>{children}</span>
      {iconPosition === 'right' && <Icon size={20} />}
    </>
  );

  // --- 4. Render Link or Button ---
  if (href) {
    // External link or Next.js internal link (external=true uses <a>)
    return (
      <Link href={href} passHref legacyBehavior>
        <a 
          className={finalClasses} 
          target={external ? "_blank" : "_self"} 
          rel={external ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      </Link>
    );
  }

  // Regular HTML button
  return (
    <button className={finalClasses} {...props}>
      {content}
    </button>
  );
}