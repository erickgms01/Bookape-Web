const { format } = require('date-fns');

function formatPublishDate(publishDate) {
    const date = new Date(publishDate);
    return format(date, 'MMM dd, yyyy');
}

const publishDate = book.publishDate;
const formattedDate = formatPublishDate(publishDate);

