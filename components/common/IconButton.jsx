export default function IconButton({ iconName, label, className = '', ...props }) {
  return (
    <button
      className={`hover:text-regal-gold transition-colors scale-95 duration-200 ease-in-out ${className}`}
      {...props}
    >
      <span className="material-symbols-outlined" data-icon={iconName}>{iconName}</span>
    </button>
  )
}
