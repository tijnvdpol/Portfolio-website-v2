export default function ErrorState({ message }: { message: string }) {
  return (
    <p role="alert" className="py-12 text-center text-red-600">
      Er is iets misgegaan: {message}
    </p>
  )
}
