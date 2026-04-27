
"use client";

import React, { useState, useEffect } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import AccountRecoveryForm from './AccountRecoveryForm';
import TwoFactorAuthCard from './TwoFactorAuthCard';
import ActiveSessionsCard from './ActiveSessionsCard';
import TwoFactorSetupModal from './TwoFactorSetupModal';
import Disable2FAModal from './Disable2FAModal';
import DeleteAccountModal from './DeleteAccountModal';
import DownloadDataModal from './DownloadDataModal';
import { auth } from '@/config/firebase';
import { getUserProfile } from '@/firebase_Routes/routes';

const SecuritynPassword = () => {
  const [openTwoFactorModal, setOpenTwoFactorModal] = useState(false);
  const [openDisable2FAModal, setDisable2FAModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    const fetch2FAStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const { profile } = await getUserProfile(user.uid);
        if (profile) {
          setIs2FAEnabled(!!profile.twoFactorEnabled);
        }
      }
    };
    fetch2FAStatus();
  }, []);

  return (
    <div className='w-full h-full text-black pb-16'>
      <div className="header w-full my-10 px-5">
        <h1 className='text-xl'>Security & Password</h1>
        <p className='mt-3 text-md text-[#71717A]'>Customize your studio identity, client documents, and portal appearance.</p>
      </div>

      <div className="cards pb-3 px-5 w-full flex lg:flex-row flex-col items-center sm:items-start justify-between gap-8">
        <ChangePasswordForm />
        <AccountRecoveryForm />
      </div>

      <div className="cards px-5 w-full flex lg:flex-row items-center flex-wrap md:flex-nowrap justify-center flex-col lg:items-start lg:justify-between gap-2 mt-10 lg:mt-0">
        <TwoFactorAuthCard
          setIsOpenTFAModal={setOpenTwoFactorModal}
          setDisable2FAModal={setDisable2FAModal}
          openDisable2FAModal={openDisable2FAModal}
          is2FAEnabled={is2FAEnabled}
          setIs2FAEnabled={setIs2FAEnabled}
          setOpenDeleteModal={setOpenDeleteModal}
          setOpenDownloadModal={setOpenDownloadModal}
        />
        <ActiveSessionsCard />
      </div>

      {openTwoFactorModal && (
        <TwoFactorSetupModal
          setIsOpenTFAModal={setOpenTwoFactorModal}
          onEnable={() => setIs2FAEnabled(true)}
        />
      )}

      {openDisable2FAModal && (
        <Disable2FAModal
          isOpen={openDisable2FAModal}
          setIsOpen={setDisable2FAModal}
          onConfirm={() => setIs2FAEnabled(false)}
        />
      )}

      <DeleteAccountModal 
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
      />

      <DownloadDataModal 
        isOpen={openDownloadModal}
        setIsOpen={setOpenDownloadModal}
      />
    </div>
  );
};

export default SecuritynPassword;
