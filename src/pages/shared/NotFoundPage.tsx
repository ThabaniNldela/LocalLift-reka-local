import Button from "@/components/common/Button"
import Card from "@/components/common/Card"

type NotFoundPageProps = {
  onReturnHome: () => void
}

export default function NotFoundPage({ onReturnHome }: NotFoundPageProps) {
  return (
    <div className="mx-auto max-w-xl py-20">
      <Card className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">404</p>
        <h2 className="text-3xl font-semibold text-slate-900">We could not find that page.</h2>
        <p className="text-sm text-slate-500">The route may have changed. Use the button below to continue exploring Reka Local.</p>
        <Button onClick={onReturnHome}>Go home</Button>
      </Card>
    </div>
  )
}
