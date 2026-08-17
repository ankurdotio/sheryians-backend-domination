const icons = {
  home: (
    <path
      d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5.5v-5.25h-3V21H5a1 1 0 0 1-1-1v-8.5Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  search: (
    <>
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  library: (
    <path
      d="M4 6h16M4 12h16M4 18h16M6.5 4v16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  ),
  chevronLeft: (
    <path
      d="m14 7-5 5 5 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  chevronRight: (
    <path
      d="m10 7 5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  play: (
    <path d="m8 5 11 7-11 7V5Z" fill="currentColor" />
  ),
  pause: (
    <>
      <path d="M7 5h3v14H7z" fill="currentColor" />
      <path d="M14 5h3v14h-3z" fill="currentColor" />
    </>
  ),
  skipBack: (
    <path
      d="M17 6v12L8 12l9-6Zm-2.5 12V6.5"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  skipForward: (
    <path
      d="M7 6v12l9-6-9-6Zm2.5 12V6.5"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  volume: (
    <path
      d="M6.5 14H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2.5L13 5.5V18l-6.5-4Zm9.5-3a3 3 0 0 1 0 2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  shuffle: (
    <path
      d="M4 7h3.5c2.6 0 4.1 2 5.4 4.2 1.2 2 2.4 4.3 5.1 4.3H20m-3-10 3 2.5-3 2.5m-13 5h3.5c1.5 0 2.6-.6 3.6-1.6m6.9 1.6 3 2.5-3 2.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  repeat: (
    <path
      d="M7 7h10l-2-2m2 2-2 2M17 17H7l2 2m-2-2 2-2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  heart: (
    <path
      d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.58A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  menu: (
    <path
      d="M4 7h16M4 12h16M4 17h16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  ),
  plus: (
    <path
      d="M12 5v14M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4l2.5 1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </>
  ),
  grid: (
    <path
      d="M5 5h6v6H5zm8 0h6v6h-6zM5 13h6v6H5zm8 0h6v6h-6z"
      fill="currentColor"
    />
  ),
  list: (
    <path
      d="M6 7h12M6 12h12M6 17h12"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  ),
}

function Icon({ name, className = '', title }) {
  return (
    <svg
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name] ?? icons.menu}
    </svg>
  )
}

export default Icon