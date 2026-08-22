type RatingStarsProps = {
  rating: number
  reviews?: number
  size?: "sm" | "md"
}

export default function RatingStars({ rating, reviews, size = "md" }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(rating))
  return (
    <div className={`flex items-center gap-2 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <div className="flex text-amber-400">
        {stars.map((filled, index) => <span key={index}>{filled ? "★" : "☆"}</span>)}
      </div>
      <span className="font-medium text-slate-700">{rating.toFixed(1)}</span>
      {reviews !== undefined ? <span className="text-slate-400">({reviews} reviews)</span> : null}
    </div>
  )
}
