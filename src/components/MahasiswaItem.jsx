import React from "react";

const MahasiswaItem = ({ status, nilai = 0 }) => {
  return (
    <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-secondary">
      <div className="flex gap-2">
        <img
          src="public/noavatar.png"
          alt=""
          className="rounded-full h-[48px] border border-primary"
        />
        <div>
          <h1 className="-mb-1 text-base font-semibold line-clamp-1 text-primary font-primary">
            <p>Ini Nama</p>
          </h1>
          <h2 className="text-sm italic font-medium text-secondary font-primary">
            <p>NIM</p>
          </h2>
        </div>
      </div>
      <div>
        <div className="flex gap-2">
          {status === "sudah" ? (
            <>
              <p className="inline-block px-4 py-3 text-xs font-semibold rounded-lg bg-customGreen text-customWhite w-20">
                Sudah/{nilai}
              </p>
            </>
          ) : (
            <>
              <p className="inline-block px-4 py-3 text-xs font-semibold rounded-lg bg-customRed text-customWhite w-20 text-center">
                Belum
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MahasiswaItem;
