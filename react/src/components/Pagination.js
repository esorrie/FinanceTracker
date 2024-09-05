import React from "react";
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage +1 )
        }
    };

    return  (
            <nav className="pagination">
                <button 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    &lt;
                </button>
                
                <button
                    onClick={() => onPageChange(1)}
                    className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
                >
                    1
                </button>

                {currentPage !== 1 && currentPage !== totalPages && (
                    <button
                        className="pagination-button active"
                    >
                        {currentPage}
                    </button>
                )}

                {totalPages > 1 && (
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                    >
                        {totalPages}
                    </button>
                )}

                <button 
                    onClick={(handleNext)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    &gt;
                </button>
            </nav>
            );
};

export default Pagination;