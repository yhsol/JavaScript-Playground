import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useListAndDetail() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_limit=10`
      );
      return await res.json();
    },
  });

  const [shownData, setShownData] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [shownDetail, setShownDetail] = useState<any>({});
  const [isDetailEditing, setIsDetailEditing] = useState(false);
  const [detailInput, setDetailInput] = useState("");

  const handleShowDetail = (targetDetail: any) => {
    setShownDetail(targetDetail);
  };

  const handleDetailEditing = (isEditing: boolean) => {
    setIsDetailEditing(isEditing);
  };

  const handleEditDetails = () => {
    setDetails((prevDetails) =>
      prevDetails.map((prevDetail) =>
        prevDetail.id === shownDetail.id
          ? {
              ...prevDetail,
              address: detailInput,
            }
          : prevDetail
      )
    );
  };

  const handleChangeDetailInput = (value: string) => {
    setDetailInput(value);
  };

  useEffect(() => {
    if (!isPending && !error && data) {
      setShownData(data);
    }
  }, [isPending, error, data]);

  useEffect(() => {
    if (!isPending && data) {
      setDetails(
        data.map((d: any) => ({
          id: d.id,
          address: JSON.stringify(d.address),
        }))
      );
    }
  }, [isPending, data]);

  return {
    isPending,
    error,
    data: shownData,
    details,
    shownDetail,
    isDetailEditing,
    detailInput,
    showDetail: handleShowDetail,
    toggleDetailEditing: handleDetailEditing,
    changeDetailInput: handleChangeDetailInput,
    editDetails: handleEditDetails,
  };
}

export const ListAndDetail = () => {
  const {
    isPending,
    error,
    data,
    details,
    detailInput,
    isDetailEditing,
    shownDetail,
    showDetail,
    toggleDetailEditing,
    changeDetailInput,
    editDetails,
  } = useListAndDetail();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <div>List and Detail</div>
      <div>
        {data.map((d: any) => (
          <div
            key={d.id}
            onClick={() => {
              const targetDetail = details.find((detail) => detail.id === d.id);
              if (targetDetail) {
                showDetail(targetDetail);
              }
            }}
          >
            {d.name}
          </div>
        ))}
      </div>
      <dialog open={!!showDetail}>
        <div>{shownDetail.address}</div>
        <button onClick={() => toggleDetailEditing(true)}>edit</button>
        {isDetailEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editDetails();
              showDetail((prev: any) => ({ ...prev, address: detailInput }));
              toggleDetailEditing(false);
            }}
          >
            <input
              type="text"
              value={detailInput || shownDetail.address}
              onChange={(e) => changeDetailInput(e.target.value)}
            />
          </form>
        )}
      </dialog>
    </div>
  );
};
