import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useValidateInviteQuery } from '@/store/apis/Common';

export const useInvitationLogic = () => {
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [loadingInvite, setLoadingInvite] = useState(false);

  const { data, isLoading, error } = useValidateInviteQuery(invitationToken as string, {
    skip: !invitationToken, // only run when token exists
  });

  //---------------------------------------
  //  GET TOKEN FROM URL
  //---------------------------------------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      setInvitationToken(token);
    }
  }, []);

  //---------------------------------------
  //  FETCH INVITATION DETAILS
  //---------------------------------------
  useEffect(() => {
    if (!data) return;

    if (!data.success) {
      toast.error(data.message || "Invalid or expired invitation");
      return;
    }

    setInviteEmail(data.email);
    setInviteRole(data.role);
  }, [data]);

  return {
    invitationToken,
    inviteEmail,
    inviteRole,
    loadingInvite,
    isLoading,
    error
  };
};
