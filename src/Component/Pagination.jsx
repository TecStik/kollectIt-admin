import React, { useState } from 'react';
import { Pagination } from "@mui/material";


const PaginationComponent = ({ allData, onChange, totalPages, page }) => {
    return (
        <div>
            <Pagination
                className="pagi__style"
                count={totalPages}
                page={page}
                onChange={onChange}
                variant="outlined"
                shape="rounded"
            />
        </div>
    )
}

export default PaginationComponent
