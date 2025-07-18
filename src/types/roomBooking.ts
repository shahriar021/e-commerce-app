export interface BookingFormProps {
  isRequestedFor:string,
  setIsRequestedFor:(value:string)=>void,
  isReasonFor:string,
  setIsReasonFor:(value:string)=>void,
  isRoomTypeCheck:string,
  setIsRoomTypeCheck:(value:string)=>void,
  isEWPGChecked: boolean;
  setIsEWPGChecked: (value: boolean) => void;
  isOfficeGuestChecked: boolean;
  setIsOfficeGuestChecked: (value: boolean) => void;
  isEmployeeChecked: boolean;
  setIsEmployeeChecked: (value: boolean) => void;
  isOfficialChecked: boolean;
  setIsOfficialChecked: (value: boolean) => void;
  isPersonalChecked: boolean;
  setIsPersonalChecked: (value: boolean) => void;
  isShiftDutyChecked: boolean;
  setIsShiftDutyChecked: (value: boolean) => void;
  checkInDate: Date;
  setCheckInDate: (date: Date) => void;
  checkOutDate: Date;
  setCheckOutDate: (date: Date) => void;
  name: string;
  setName: (name: string) => void;
  department: string;
  setDepartment: (department: string) => void;
  designation: string;
  setDesignation: (designation: string) => void;
  contactNo: string;
  setContactNo: (contactNo: string) => void;
  isStandardRoomChecked: boolean;
  setIsStandardRoomChecked: (value: boolean) => void;
  isSingleRoomChecked: boolean;
  setIsSingleRoomChecked: (value: boolean) => void;
  isVipRoomChecked: boolean;
  setIsVipRoomChecked: (value: boolean) => void;
  isHighRoomChecked: boolean;
  setIsHighRoomChecked: (value: boolean) => void;
  isSuitChecked: boolean;
  setIsSuitChecked: (value: boolean) => void;
  isCoupleSuiteChecked: boolean;
  setIsCoupleSuiteChecked: (value: boolean) => void;
  guestList: { guestName: string; relationName: string }[];
  setGuestList: (
    guestList: { guestName: string; relationName: string }[]
  ) => void;
  handleAddGuest: () => void;
  handleRemoveGuest: (index: number) => void;
  onDocumentPress: () => void;
  showDateTimePicker: (
    mode: "date" | "time",
    type: "checkIn" | "checkOut" | "reqDate"
  ) => void;
  requestedByName: string;
  setRequestedByName: (name: string,uri:string,type:string) => void;
  selectedFile: { name: string,uri:string,type:string | undefined } | null;
  reqDate: Date;
  setReqDate: (date: Date) => void;
}

export type SelectedFile={
  name:string,
  uri:string,
  type:string | undefined
}


export interface BookingRequestList {
  id: number;
  user_name: string;
  created_by_name: string;
  updated_by_name: string;
  room_type_name: string;
  alloted_room_category_name: string | null;
  alloted_room_name: string | null;
  personal_guest_name: string;
  personal_guest_relation: string;
  user_id: string;
  guest_id: string;
  designation: string;
  request_for: string;
  reason_for: string;
  check_in: string;
  check_out: string;
  occupent_name: string;
  occupent_dept_company: string;
  occupent_designation: string;
  occupent_contact_no: string;
  room_type_id: number;
  requested_by_name: string;
  requested_by_date: string;
  recommended_by_name: string | null;
  recommended_by_date: string | null;
  approved_by_name: string | null;
  approved_by_date: string | null;
  supervised_by_name: string | null;
  supervised_by_date: string | null;
  requested_by_signature: string | null;
  recommended_by_signature: string | null;
  approved_by_signature: string | null;
  supervised_by_signature: string | null;
  status: string;
  reporting_status: string;
  admin_status: string;
  admin_comments: string | null;
  reporting_comments: string | null;
  created_by: number;
  updated_by: number;
  alloted_room_category_id: number | null;
  alloted_room_id: number | null;
  created_at: string;
  updated_at: string;
}


export type StatusColorType = "pending" | "Approved" | "Reject";