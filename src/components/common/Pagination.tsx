import Button from "@/components/common/Button"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ onPageChange, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)} variant="ghost">Previous</Button>
      <span>Page {page} of {totalPages}</span>
      <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} variant="ghost">Next</Button>
    </div>
  )
}
