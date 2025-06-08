import ReactPaginate from "react-paginate";

type TProps = {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    forcePage?: number;
}

export const Paginator = ({ pageCount, onPageChange, forcePage }: TProps) => {
    return (
        <ReactPaginate
            breakLabel={"..."}
            breakClassName={"cursor-pointer"}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName={"flex items-center justify-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 text-base"}
            disabledClassName={"text-muted-foreground"}
            disabledLinkClassName={"cursor-not-allowed"}
            activeClassName={"cursor-pointer text-primary"}
            pageClassName={"cursor-pointer"}
            previousClassName={"cursor-pointer"}
            nextClassName={"cursor-pointer"}
            forcePage={forcePage}
        />
    )
}