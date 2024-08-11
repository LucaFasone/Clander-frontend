import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

function PaginationWrapper({ page, setPageNext, setPagePrev }: { page: number, setPageNext: (value: React.SetStateAction<number>) => void, setPagePrev: (value: React.SetStateAction<number>) => void }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => setPageNext(page)} />
                </PaginationItem>
                <PaginationLink isActive className='bg-blue-400 hover:bg-blue-400'>{page}</PaginationLink>
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => setPagePrev(page)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationWrapper