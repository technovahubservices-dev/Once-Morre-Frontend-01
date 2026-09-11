export default function WhatsAppButton() {
  const phoneNumber = '919600330543'

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="fixed right-5 bottom-6 z-50 group">

      {/* Contact Card */}
      <div
        className="
          absolute right-0 bottom-20
          w-[280px]
          opacity-0 translate-y-3 scale-95
          pointer-events-none
          group-hover:opacity-100
          group-hover:translate-y-0
          group-hover:scale-100
          group-hover:pointer-events-auto
          transition-all duration-300 ease-out
          origin-bottom-right
        "
      >
        <button
          type="button"
          onClick={handleWhatsApp}
          className="
            w-full
            bg-[#fffdf8]
            border border-[#e8e2d5]
            rounded-2xl
            px-5 py-4
            text-left
            shadow-[0_12px_35px_rgba(0,0,0,0.14)]
            hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]
            transition-shadow duration-200
          "
        >
          <div className="flex items-center gap-3">

            {/* WhatsApp icon */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white fill-current"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.5 0 .17 5.33.17 11.87c0 2.09.55 4.13 1.6 5.92L.06 24l6.35-1.67a11.86 11.86 0 0 0 5.63 1.43h.01c6.54 0 11.87-5.33 11.87-11.87 0-3.17-1.23-6.15-3.4-8.41ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.88 9.88 0 0 1-1.52-5.27C2.12 6.4 6.57 1.95 12.05 1.95c2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7.01c0 5.49-4.45 9.93-9.91 9.93Zm5.45-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </div>

              <span className="absolute -right-0.5 -top-0.5 w-3 h-3 bg-[#25D366] border-2 border-[#fffdf8] rounded-full" />
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-medium tracking-wide text-on-surface-variant">
                NEED HELP?
              </p>

              <p className="text-[16px] font-semibold text-deep-emerald mt-0.5">
                Chat with us
              </p>

              <p className="text-sm text-on-surface-variant mt-0.5">
                +91 9600330543
              </p>
            </div>

            <span className="material-symbols-outlined ml-auto text-deep-emerald text-[20px]">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Small pointer */}
        <div className="absolute right-5 -bottom-2 w-4 h-4 bg-[#fffdf8] border-r border-b border-[#e8e2d5] rotate-45" />
      </div>

      {/* Floating WhatsApp Button */}
      <button
        type="button"
        onClick={handleWhatsApp}
        aria-label="Chat with us on WhatsApp"
        className="
          relative
          w-16 h-16
          rounded-full
          bg-[#25D366]
          text-white
          flex items-center justify-center
          shadow-[0_8px_25px_rgba(37,211,102,0.35)]
          hover:scale-110
          hover:shadow-[0_10px_30px_rgba(37,211,102,0.45)]
          transition-all duration-200
        "
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" />

        <svg
          viewBox="0 0 24 24"
          className="relative w-9 h-9 fill-current"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.5 0 .17 5.33.17 11.87c0 2.09.55 4.13 1.6 5.92L.06 24l6.35-1.67a11.86 11.86 0 0 0 5.63 1.43h.01c6.54 0 11.87-5.33 11.87-11.87 0-3.17-1.23-6.15-3.4-8.41ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.88 9.88 0 0 1-1.52-5.27C2.12 6.4 6.57 1.95 12.05 1.95c2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7.01c0 5.49-4.45 9.93-9.91 9.93Zm5.45-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </button>
    </div>
  )
}
