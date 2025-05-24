/*
  Warnings:

  - Made the column `arrival_cancelled_by_user` on table `ur_dev_portal_table` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departure_cancelled_by_user` on table `ur_dev_portal_table` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arrival_flight_delayed` on table `ur_dev_portal_table` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departure_flight_delayed` on table `ur_dev_portal_table` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `ur_nationalprogram` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status_supply` on table `ur_nationalprogram` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hotel_location` on table `ur_nationalprogram_hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arrival_cancelled_by_user` on table `ur_nationalprogram_step2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departure_cancelled_by_user` on table `ur_nationalprogram_step2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rBreakfastIncluded` on table `ur_nationalprogram_step_hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rWifiIncludedMR` on table `ur_nationalprogram_step_hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rWifiIncludedSR` on table `ur_nationalprogram_step_hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rHotelShuttle` on table `ur_nationalprogram_step_hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restaurant_location` on table `ur_restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ur_admin_user` MODIFY `forceChangePassword` TINYINT NOT NULL DEFAULT 1,
    MODIFY `dashboard_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_admin_user_log` MODIFY `is_login` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_active` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_announcement` MODIFY `chkDateProgram` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkUpcomingEvent` TINYINT NOT NULL DEFAULT 1,
    MODIFY `ongoingdate` TINYINT NOT NULL DEFAULT 1,
    MODIFY `ongoingtime` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkProgramVenue` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkAttendees` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rSpaceNeeded` TINYINT NOT NULL DEFAULT 1,
    MODIFY `translated` TINYINT NOT NULL DEFAULT 1,
    MODIFY `translatedF` TINYINT NOT NULL DEFAULT 1,
    MODIFY `translatedFF` TINYINT NOT NULL DEFAULT 1,
    MODIFY `registration` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `editable` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_announcement_draft` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `adminStatus` TINYINT NOT NULL DEFAULT 1,
    MODIFY `draft_link_sent` TINYINT NOT NULL DEFAULT 1,
    MODIFY `final_draft_link_sent` TINYINT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_announcement_draft_comment` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_announcement_subscriber` MODIFY `sub_role` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `attachments` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_archived_special_transportation` MODIFY `travel_assistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `flight_delayed` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking` MODIFY `rBookingPurpose` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAVSetup` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rOpeningClosing` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rFoodAssistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rVolunteers` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAvEquipments` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRoomSetup` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWiredMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWirelessMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodiumMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpProjector` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodium` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpClicker` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHDMI` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpVgaWire` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpEasels` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpConvertor` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpAuxCable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `vrm_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `imara_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `pe_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `notification` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_breakfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_am_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_lunch` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_pm_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_dinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_allday` TINYINT NOT NULL DEFAULT 1,
    MODIFY `hide_food_dashboard` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rJamatkhanaTour` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rPhotographer` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRegistrationVolunteer` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRequireHotelRooms` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRequireTransportation` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_17_8_2024` MODIFY `rBookingPurpose` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAVSetup` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rOpeningClosing` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rFoodAssistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rVolunteers` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAvEquipments` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRoomSetup` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWiredMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWirelessMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodiumMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpProjector` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodium` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpClicker` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHDMI` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpVgaWire` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpEasels` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpConvertor` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpAuxCable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `vrm_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `imara_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `pe_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `notification` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_breakfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_am_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_lunch` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_pm_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_dinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `food_allday` TINYINT NOT NULL DEFAULT 1,
    MODIFY `hide_food_dashboard` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rJamatkhanaTour` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rPhotographer` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRegistrationVolunteer` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRequireHotelRooms` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rRequireTransportation` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_address` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `facility_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_food` MODIFY `breakfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `am_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `lunch` TINYINT NOT NULL DEFAULT 1,
    MODIFY `pm_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `dinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `allday` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_location` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_notify` TINYINT NOT NULL DEFAULT 1,
    MODIFY `private_mode` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_portfolio` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_sms_log` MODIFY `sms_type` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_queue` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_booking_subscriber` MODIFY `sub_role` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `attachments` TINYINT NOT NULL DEFAULT 1,
    MODIFY `text_message` TINYINT NOT NULL DEFAULT 1,
    MODIFY `admin_approval` TINYINT NOT NULL DEFAULT 1,
    MODIFY `ijkc` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_access_level` MODIFY `level_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_categoryl1` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_categoryl2` MODIFY `sort_order` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_categoryl3` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_categoryntf` MODIFY `sort_order` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_gl_account` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_reimbursement` MODIFY `drpCheckPayableTo` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_l1` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_l6` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_edit` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_reimbursement_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_reimbursement_expense` MODIFY `drpCheckPayableTo` TINYINT NOT NULL DEFAULT 1,
    MODIFY `txtContractReq` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_budget_team` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_chatbox` MODIFY `is_delete` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram` MODIFY `showGuestList` TINYINT NOT NULL DEFAULT 1,
    MODIFY `np_block` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `sent_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_questionnaire` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_hotel` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_food` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_registration` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_supply` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_questionnaire` MODIFY `rHotelBreskfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAvEquipments` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWiredMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWirelessMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodiumMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpProjector` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodium` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpClicker` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHDMI` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpVgaWire` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpEasels` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpAuxCable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_sms_log` MODIFY `sms_type` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_queue` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_read` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_step2` MODIFY `rGender` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rTravelAssistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpTravelPlans` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkTravelAssistanceArrival` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkTravelAssistanceDeparture` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rHotelAccomodation` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHotelRoomOptions` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rVegetarianMeal` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendMeeting` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinnerFri` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinnerSat` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rJKride` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_picked_up` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_volunteer` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_step2_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_step2_interval` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_nationalprogram_step2_topic` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_dev_portal_table` MODIFY `arrival_cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `departure_cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `arrival_flight_delayed` TINYINT NOT NULL DEFAULT 1,
    MODIFY `departure_flight_delayed` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_event` MODIFY `deleted` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_food_support_subscriber` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_assigned` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_data` MODIFY `status_sent` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_name` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_rides` MODIFY `enable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_sms_log` MODIFY `status_queue` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_subscriber` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_jk_title` MODIFY `sort_order` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_meeting_day_food` MODIFY `breakfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `am_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `lunch` TINYINT NOT NULL DEFAULT 1,
    MODIFY `pm_break` TINYINT NOT NULL DEFAULT 1,
    MODIFY `dinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `allday` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram` MODIFY `showGuestList` TINYINT NOT NULL DEFAULT 1,
    MODIFY `np_block` TINYINT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `sent_status` TINYINT NULL DEFAULT 1,
    MODIFY `status_questionnaire` TINYINT NULL DEFAULT 1,
    MODIFY `status_hotel` TINYINT NULL DEFAULT 1,
    MODIFY `status_food` TINYINT NULL DEFAULT 1,
    MODIFY `status_registration` TINYINT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `hotel_editable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_supply` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_additional` MODIFY `sort_order` TINYINT NULL DEFAULT 1,
    MODIFY `required` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_driver` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_food` MODIFY `need_goodie_bag` TINYINT NULL DEFAULT 1,
    MODIFY `lock_form` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_foodmenu_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_formbuilder` MODIFY `predefined` TINYINT NOT NULL DEFAULT 1,
    MODIFY `required` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_hotel` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `hotel_location` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_hotel_location` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_hotel_price` MODIFY `chkBreakfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `hotel_status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_hotel_price_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_predefined` MODIFY `chkRolePosition` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkRideJK` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkDinnerFri` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkDinnerSat` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkAllergies` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkRolePosition_required` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkRideJK_required` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkDinnerFri_required` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkDinnerSat_required` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkAllergies_required` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_questionnaire` MODIFY `rHotelBreskfast` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAvEquipments` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWiredMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpWirelessMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodiumMic` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpProjector` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpPodium` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpClicker` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHDMI` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpVgaWire` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpEasels` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpAuxCable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_questionnaire_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_sms_log` MODIFY `sms_type` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_queue` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_read` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_step2` MODIFY `rGender` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rTravelAssistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpTravelPlans` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkTravelAssistanceArrival` TINYINT NOT NULL DEFAULT 1,
    MODIFY `chkTravelAssistanceDeparture` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rHotelAccomodation` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpHotelRoomOptions` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinner` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rVegetarianMeal` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendMeeting` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinnerFri` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rAttendDinnerSat` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rJKride` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_editable` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_picked_up` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_volunteer` TINYINT NOT NULL DEFAULT 1,
    MODIFY `arrival_cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `departure_cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `arrival_flight_delayed` TINYINT NULL DEFAULT 1,
    MODIFY `departure_flight_delayed` TINYINT NULL DEFAULT 1,
    MODIFY `is_approved` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_step2_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_step2_interval` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_step2_topic` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_step_hotel` MODIFY `rBreakfastIncluded` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rWifiIncludedMR` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rWifiIncludedSR` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rHotelShuttle` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_approved` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_subscriber` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_supply` MODIFY `drpSupplyBox` TINYINT NOT NULL DEFAULT 1,
    MODIFY `drpFlipChart` TINYINT NOT NULL DEFAULT 1,
    MODIFY `rProjectorScreen` TINYINT NOT NULL DEFAULT 1,
    MODIFY `supply_status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `disabled` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_nationalprogram_supply_comment` MODIFY `message_type` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_portalupdates` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `priority` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_portalupdates_category` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_portfolios` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_portfolios_category` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_reimbursement` MODIFY `email_sent` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status_public` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_reimbursement_draft` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_reimbursement_public` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_reimbursement_subscriber` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_restaurant` MODIFY `restaurant_location` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_restaurant_category` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_restaurant_food` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_special_transportation` MODIFY `travel_assistance` TINYINT NOT NULL DEFAULT 1,
    MODIFY `cancelled_by_user` TINYINT NOT NULL DEFAULT 1,
    MODIFY `flight_delayed` TINYINT NOT NULL DEFAULT 1,
    MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_text_templates` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_volunteer_payment` MODIFY `payment_status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ur_volunteer_profile_institutions` MODIFY `status` TINYINT NOT NULL DEFAULT 1;
