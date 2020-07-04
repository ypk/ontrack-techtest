import { React } from "../../common";

const ListingTableHeader = () => {
  const ListingHeadings = [
    "Id",
    "Author",
    "Title",
    "Publication Year",
    "Page Count",
    "Publication City",
    "Publication Country",
  ];

  return (
    <thead>
      <tr>
        {ListingHeadings.map((header, index) => (
          <th key={index} variant="primary" className="align-middle text-center">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ListingTableHeader;
