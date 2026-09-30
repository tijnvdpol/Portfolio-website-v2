export default function ErrorState({ message }: { message: string }) {
  return (
    <p role="alert" className="border-[1.5px] border-danger bg-danger-bg px-5 py-4 font-mono text-sm text-danger">
      Er is iets misgegaan: {message}
    </p>
  )
}
