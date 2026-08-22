import Card from "@/components/common/Card"
import EmptyState from "@/components/common/EmptyState"
import RatingStars from "@/components/common/RatingStars"
import type { Review } from "@/types"
import { formatDate } from "@/utils/format"

type ReviewListProps = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <EmptyState title="No reviews yet" description="Be the first customer to share your experience." />
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="font-semibold text-slate-900">{review.customerName}</h4>
              <p className="text-sm text-slate-400">{formatDate(review.createdAt)}</p>
            </div>
            <RatingStars rating={review.rating} size="sm" />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment || "Great service and quality products."}</p>
        </Card>
      ))}
    </div>
  )
}
