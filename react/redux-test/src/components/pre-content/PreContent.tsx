import React, { useEffect, useMemo, useState } from "react";

type PreContentRenderProps = {
  isIdle: boolean;
  isLoading: boolean;
  isFetching?: boolean;
  error: Error | null;
};

function getMessageByStatus({
  isIdle,
  isLoading,
  isFetching,
  error,
}: PreContentRenderProps) {
  if (isIdle) return "Not Ready...";
  if (isLoading) return "Loading...";
  if (isFetching) return "Fetching...";
  if (error) return error.message ? error.message : "Failed to Fetch Data";
}

function PreContent(props: PreContentRenderProps) {
  const [message, setMessage] = useState("");
  const messageByStatus = useMemo(() => getMessageByStatus(props), [props]);

  useEffect(() => {
    if (!messageByStatus) return;
    setMessage(messageByStatus);
  }, [messageByStatus]);

  return <div>{message}</div>;
}

export default PreContent;
