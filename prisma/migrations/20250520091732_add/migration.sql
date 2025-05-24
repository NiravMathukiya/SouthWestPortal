-- CreateTable
CREATE TABLE `graphics_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `graphics_request` TINYINT NOT NULL DEFAULT 0,
    `graphics_review` TINYINT NOT NULL DEFAULT 0,
    `board` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `txtProgramDate` VARCHAR(100) NOT NULL,
    `demographic` VARCHAR(100) NOT NULL,
    `event_name` VARCHAR(100) NOT NULL,
    `timing` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `uploaded_file` VARCHAR(255) NOT NULL,
    `uploaded_filename` VARCHAR(255) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(30) NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_admin_role` (
    `admin_role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(100) NOT NULL,
    `date_added` DATE NOT NULL,

    PRIMARY KEY (`admin_role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_admin_user` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_role` INTEGER NOT NULL,
    `access_level_id` INTEGER NOT NULL,
    `budget_team_id` INTEGER NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `password_sha` VARCHAR(256) NOT NULL,
    `first_name` VARCHAR(32) NOT NULL,
    `last_name` VARCHAR(32) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(128) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `forceChangePassword` BOOLEAN NOT NULL DEFAULT false,
    `dashboard_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_admin_user_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_login` DATETIME(0) NOT NULL,
    `date_active` DATETIME(0) NOT NULL,
    `is_login` BOOLEAN NOT NULL DEFAULT true,
    `is_active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_admin_user_role` (
    `admin_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `date_added` DATE NOT NULL,

    PRIMARY KEY (`admin_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_allday_detail` (
    `allday_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`allday_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_am_break_detail` (
    `am_break_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`am_break_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement` (
    `form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_portfolio_cat` VARCHAR(255) NOT NULL,
    `portfolio` VARCHAR(64) NOT NULL,
    `txtPortfolio` VARCHAR(64) NOT NULL,
    `drpBigRock` VARCHAR(64) NOT NULL,
    `SubmittedBy` VARCHAR(64) NOT NULL DEFAULT '',
    `contact` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `program` VARCHAR(128) NOT NULL,
    `dateprogram` VARCHAR(64) NOT NULL,
    `chkDateProgram` BOOLEAN NOT NULL,
    `chkUpcomingEvent` BOOLEAN NOT NULL,
    `ongoingdate` BOOLEAN NOT NULL,
    `timeprogram` VARCHAR(64) NOT NULL,
    `ongoingtime` BOOLEAN NOT NULL,
    `date1` DATE NOT NULL,
    `date2` DATE NOT NULL,
    `date3` DATE NOT NULL,
    `venue` VARCHAR(256) NULL,
    `chkProgramVenue` BOOLEAN NOT NULL DEFAULT false,
    `chkAttendees` BOOLEAN NOT NULL DEFAULT false,
    `insurance` TINYTEXT NOT NULL,
    `reviewed` INTEGER NULL,
    `rSpaceNeeded` BOOLEAN NOT NULL,
    `translated` BOOLEAN NOT NULL,
    `translatedF` BOOLEAN NOT NULL,
    `translatedFF` BOOLEAN NOT NULL,
    `language` VARCHAR(64) NOT NULL,
    `languageF` VARCHAR(64) NOT NULL,
    `languageFF` VARCHAR(64) NOT NULL,
    `registration` BOOLEAN NOT NULL,
    `txtRegistrationLink` VARCHAR(255) NULL,
    `registration_fields` VARCHAR(1000) NULL,
    `registration_selected_options` VARCHAR(2560) NOT NULL,
    `committee` VARCHAR(500) NOT NULL,
    `firstweek` TEXT NOT NULL,
    `rFirstWeekLanguage` VARCHAR(64) NOT NULL DEFAULT 'English',
    `firstweek_translated` TEXT NOT NULL,
    `twoweeks` TEXT NOT NULL,
    `txtTwoWeeks3` TEXT NOT NULL,
    `rFollowWeekLanguage` VARCHAR(64) NOT NULL DEFAULT 'English',
    `rFollowWeekLanguage3` VARCHAR(64) NOT NULL,
    `twoweeks_translated` TEXT NOT NULL,
    `twoweeks_translated2` TEXT NOT NULL,
    `comments` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `editable` BOOLEAN NOT NULL DEFAULT false,
    `channel_requested` VARCHAR(128) NOT NULL DEFAULT 'announcement',

    PRIMARY KEY (`form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_draft` (
    `draft_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_from` DATE NOT NULL,
    `date_to` DATE NOT NULL,
    `receiver_email` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_user` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `adminStatus` BOOLEAN NOT NULL DEFAULT false,
    `editor_id1` INTEGER NOT NULL,
    `editor_id2` INTEGER NOT NULL,
    `draft_link_sent` BOOLEAN NOT NULL DEFAULT false,
    `final_draft_link_sent` BOOLEAN NOT NULL DEFAULT false,
    `sequence` VARCHAR(1000) NULL,

    PRIMARY KEY (`draft_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_draft_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `txtName` VARCHAR(64) NOT NULL,
    `txtEmail` VARCHAR(64) NOT NULL,
    `txtComment` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `draft_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_files` (
    `file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_id` INTEGER NOT NULL,
    `new_filename` VARCHAR(128) NOT NULL,
    `real_filename` VARCHAR(128) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_notice` (
    `notice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_id` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `editable` TINYINT NOT NULL,
    `edit_link` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`notice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_pagebreak` (
    `pb_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_draft_id` INTEGER NOT NULL,
    `ref_form_id` INTEGER NOT NULL,

    PRIMARY KEY (`pb_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_announcement_subscriber` (
    `subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `institution` VARCHAR(64) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(128) NOT NULL,
    `sub_role` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL,
    `attachments` BOOLEAN NOT NULL DEFAULT true,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_archived_special_transportation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actual_id` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,
    `request_type` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `event_id` INTEGER NOT NULL,
    `cell_phone` VARCHAR(20) NOT NULL,
    `travel_assistance` BOOLEAN NOT NULL DEFAULT false,
    `pickup_location_type` INTEGER NULL,
    `dropoff_location_type` INTEGER NULL,
    `airline` VARCHAR(100) NULL,
    `flight_number` VARCHAR(100) NULL,
    `airport_pickup_location` VARCHAR(100) NOT NULL,
    `flight_pickup_date` VARCHAR(20) NOT NULL,
    `flight_pickup_time` VARCHAR(20) NOT NULL,
    `dropoff_location` VARCHAR(100) NOT NULL,
    `dropoff_date` VARCHAR(20) NOT NULL,
    `dropoff_time` VARCHAR(20) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `driver_id` INTEGER NULL,
    `dp_time` VARCHAR(5) NULL,
    `secret_key` VARCHAR(50) NOT NULL,
    `cancelled_by_user` BOOLEAN NOT NULL DEFAULT false,
    `flight_delayed` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    UNIQUE INDEX `actual_id`(`actual_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `drpPortfolio` VARCHAR(64) NOT NULL,
    `txtPortfolio` VARCHAR(64) NOT NULL,
    `txtRequestEmail` VARCHAR(256) NOT NULL,
    `txtEventName` VARCHAR(64) NOT NULL,
    `txtChargeName` VARCHAR(64) NOT NULL,
    `txtContactNumber` VARCHAR(24) NOT NULL,
    `chkInstitutions` VARCHAR(128) NOT NULL,
    `txtLocation` VARCHAR(64) NOT NULL,
    `rBookingPurpose` BOOLEAN NOT NULL,
    `rAVSetup` BOOLEAN NOT NULL,
    `txtAVSetup` VARCHAR(256) NOT NULL,
    `rOpeningClosing` BOOLEAN NOT NULL,
    `txtOpeningClosing` TEXT NOT NULL,
    `openFacilityTime` VARCHAR(64) NULL,
    `rFoodAssistance` BOOLEAN NOT NULL,
    `txtFoodAssistance` TEXT NOT NULL,
    `rVolunteers` BOOLEAN NOT NULL,
    `txtVolunteers` VARCHAR(256) NOT NULL,
    `rAvEquipments` BOOLEAN NOT NULL,
    `rRoomSetup` BOOLEAN NOT NULL,
    `drpWiredMic` BOOLEAN NOT NULL,
    `drpWirelessMic` BOOLEAN NOT NULL,
    `drpPodiumMic` BOOLEAN NOT NULL,
    `txtMicRequests` VARCHAR(256) NOT NULL,
    `drpProjector` BOOLEAN NOT NULL,
    `drpPodium` BOOLEAN NOT NULL,
    `drpClicker` BOOLEAN NOT NULL,
    `drpHDMI` BOOLEAN NOT NULL,
    `drpVgaWire` BOOLEAN NOT NULL,
    `drpEasels` BOOLEAN NOT NULL,
    `drpConvertor` BOOLEAN NOT NULL,
    `drpAuxCable` BOOLEAN NOT NULL,
    `txtAVInfo` TEXT NOT NULL,
    `rRoomSetupOpt` VARCHAR(64) NOT NULL,
    `txtRoomSetupOpt` TEXT NOT NULL,
    `txtTableNeeded` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `txtDeniedReason` VARCHAR(256) NOT NULL,
    `vrm_status` BOOLEAN NOT NULL DEFAULT false,
    `imara_status` BOOLEAN NOT NULL DEFAULT false,
    `pe_status` BOOLEAN NOT NULL,
    `notification` BOOLEAN NOT NULL DEFAULT true,
    `food_breakfast` BOOLEAN NOT NULL DEFAULT false,
    `food_am_break` BOOLEAN NOT NULL DEFAULT false,
    `food_lunch` BOOLEAN NOT NULL DEFAULT false,
    `food_pm_break` BOOLEAN NOT NULL DEFAULT false,
    `food_dinner` BOOLEAN NOT NULL DEFAULT false,
    `food_allday` BOOLEAN NOT NULL DEFAULT false,
    `hide_food_dashboard` BOOLEAN NOT NULL DEFAULT false,
    `secret_key` VARCHAR(50) NULL,
    `rJamatkhanaTour` BOOLEAN NOT NULL DEFAULT false,
    `JamatkhanaTourTiming` VARCHAR(10) NULL,
    `rPhotographer` BOOLEAN NOT NULL DEFAULT false,
    `PhotographerStartTime` VARCHAR(10) NULL,
    `PhotographerEndTime` VARCHAR(10) NULL,
    `rRegistrationVolunteer` BOOLEAN NOT NULL DEFAULT false,
    `RegistrationVolunteerTiming` VARCHAR(10) NULL,
    `rRequireHotelRooms` BOOLEAN NOT NULL DEFAULT false,
    `RequireHotelRoomsComments` VARCHAR(500) NULL,
    `rRequireTransportation` BOOLEAN NOT NULL DEFAULT false,
    `rRequireTransportationComments` VARCHAR(500) NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_17_8_2024` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `drpPortfolio` VARCHAR(64) NOT NULL,
    `txtPortfolio` VARCHAR(64) NOT NULL,
    `txtRequestEmail` VARCHAR(256) NOT NULL,
    `txtEventName` VARCHAR(64) NOT NULL,
    `txtChargeName` VARCHAR(64) NOT NULL,
    `txtContactNumber` VARCHAR(24) NOT NULL,
    `chkInstitutions` VARCHAR(128) NOT NULL,
    `txtLocation` VARCHAR(64) NOT NULL,
    `rBookingPurpose` BOOLEAN NOT NULL,
    `rAVSetup` BOOLEAN NOT NULL,
    `txtAVSetup` VARCHAR(256) NOT NULL,
    `rOpeningClosing` BOOLEAN NOT NULL,
    `txtOpeningClosing` TEXT NOT NULL,
    `openFacilityTime` VARCHAR(64) NULL,
    `rFoodAssistance` BOOLEAN NOT NULL,
    `txtFoodAssistance` TEXT NOT NULL,
    `rVolunteers` BOOLEAN NOT NULL,
    `txtVolunteers` VARCHAR(256) NOT NULL,
    `rAvEquipments` BOOLEAN NOT NULL,
    `rRoomSetup` BOOLEAN NOT NULL,
    `drpWiredMic` BOOLEAN NOT NULL,
    `drpWirelessMic` BOOLEAN NOT NULL,
    `drpPodiumMic` BOOLEAN NOT NULL,
    `txtMicRequests` VARCHAR(256) NOT NULL,
    `drpProjector` BOOLEAN NOT NULL,
    `drpPodium` BOOLEAN NOT NULL,
    `drpClicker` BOOLEAN NOT NULL,
    `drpHDMI` BOOLEAN NOT NULL,
    `drpVgaWire` BOOLEAN NOT NULL,
    `drpEasels` BOOLEAN NOT NULL,
    `drpConvertor` BOOLEAN NOT NULL,
    `drpAuxCable` BOOLEAN NOT NULL,
    `txtAVInfo` TEXT NOT NULL,
    `rRoomSetupOpt` VARCHAR(64) NOT NULL,
    `txtRoomSetupOpt` TEXT NOT NULL,
    `txtTableNeeded` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `txtDeniedReason` VARCHAR(256) NOT NULL,
    `vrm_status` BOOLEAN NOT NULL DEFAULT false,
    `imara_status` BOOLEAN NOT NULL DEFAULT false,
    `pe_status` BOOLEAN NOT NULL,
    `notification` BOOLEAN NOT NULL DEFAULT true,
    `food_breakfast` BOOLEAN NOT NULL DEFAULT false,
    `food_am_break` BOOLEAN NOT NULL DEFAULT false,
    `food_lunch` BOOLEAN NOT NULL DEFAULT false,
    `food_pm_break` BOOLEAN NOT NULL DEFAULT false,
    `food_dinner` BOOLEAN NOT NULL DEFAULT false,
    `food_allday` BOOLEAN NOT NULL DEFAULT false,
    `hide_food_dashboard` BOOLEAN NOT NULL DEFAULT false,
    `secret_key` VARCHAR(50) NULL,
    `rJamatkhanaTour` BOOLEAN NOT NULL DEFAULT false,
    `JamatkhanaTourTiming` VARCHAR(10) NULL,
    `rPhotographer` BOOLEAN NOT NULL DEFAULT false,
    `PhotographerStartTime` VARCHAR(10) NULL,
    `PhotographerEndTime` VARCHAR(10) NULL,
    `rRegistrationVolunteer` BOOLEAN NOT NULL DEFAULT false,
    `RegistrationVolunteerTiming` VARCHAR(10) NULL,
    `rRequireHotelRooms` BOOLEAN NOT NULL DEFAULT false,
    `RequireHotelRoomsComments` VARCHAR(500) NULL,
    `rRequireTransportation` BOOLEAN NOT NULL DEFAULT false,
    `rRequireTransportationComments` VARCHAR(500) NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_address` (
    `address_id` INTEGER NOT NULL AUTO_INCREMENT,
    `facility_name` VARCHAR(64) NOT NULL,
    `facility_address` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `facility_type` BOOLEAN NOT NULL,
    `calendar_id` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_allday_detail` (
    `booking_allday_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_allday_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_am_break_detail` (
    `booking_am_break_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_am_break_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_breakfast_detail` (
    `booking_breakfast_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_breakfast_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_booking_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_date` (
    `bd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_booking_id` INTEGER NOT NULL,
    `txtDateOfEvent` DATE NOT NULL,
    `txtTimeOfEventStart` VARCHAR(16) NOT NULL,
    `txtTimeOfEventEnd` VARCHAR(16) NOT NULL,
    `txtAttendanceCount` INTEGER NOT NULL,
    `gEventID` VARCHAR(64) NOT NULL,
    `gEventLink` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`bd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_date_17_8_2024` (
    `bd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_booking_id` INTEGER NOT NULL,
    `txtDateOfEvent` DATE NOT NULL,
    `txtTimeOfEventStart` VARCHAR(16) NOT NULL,
    `txtTimeOfEventEnd` VARCHAR(16) NOT NULL,
    `txtAttendanceCount` INTEGER NOT NULL,
    `gEventID` VARCHAR(64) NOT NULL,
    `gEventLink` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`bd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_dinner_detail` (
    `booking_dinner_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_dinner_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_food` (
    `booking_food_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `breakfast` BOOLEAN NOT NULL DEFAULT false,
    `breakfast_non_veg_guest` INTEGER NULL,
    `breakfast_veg_guest` INTEGER NULL,
    `breakfast_serving_time` VARCHAR(8) NULL,
    `breakfast_cost_per_item` DECIMAL(8, 2) NULL,
    `breakfast_comments` VARCHAR(500) NULL,
    `breakfast_total_cost` DECIMAL(8, 2) NULL,
    `am_break` BOOLEAN NOT NULL DEFAULT false,
    `am_non_veg_guest` INTEGER NULL,
    `am_veg_guest` INTEGER NULL,
    `am_serving_time` VARCHAR(8) NULL,
    `am_cost_per_item` DECIMAL(8, 2) NULL,
    `am_break_comments` VARCHAR(500) NULL,
    `am_total_cost` DECIMAL(8, 2) NULL,
    `lunch` BOOLEAN NOT NULL DEFAULT false,
    `lunch_non_veg_guest` INTEGER NULL,
    `lunch_veg_guest` INTEGER NULL,
    `lunch_serving_time` VARCHAR(8) NULL,
    `lunch_cost_per_item` DECIMAL(8, 2) NULL,
    `lunch_cuisine_item` INTEGER NULL,
    `lunch_comments` VARCHAR(500) NULL,
    `lunch_total_cost` DECIMAL(8, 2) NULL,
    `pm_break` BOOLEAN NOT NULL DEFAULT false,
    `pm_non_veg_guest` INTEGER NULL,
    `pm_veg_guest` INTEGER NULL,
    `pm_serving_time` VARCHAR(8) NULL,
    `pm_cost_per_item` DECIMAL(8, 2) NULL,
    `pm_break_comments` VARCHAR(500) NULL,
    `pm_total_cost` DECIMAL(8, 2) NULL,
    `dinner` BOOLEAN NOT NULL DEFAULT false,
    `dinner_non_veg_guest` INTEGER NULL,
    `dinner_veg_guest` INTEGER NULL,
    `dinner_serving_time` VARCHAR(8) NULL,
    `dinner_cost_per_item` DECIMAL(8, 2) NULL,
    `dinner_cuisine_item` INTEGER NULL,
    `dinner_comments` VARCHAR(500) NULL,
    `dinner_total_cost` DECIMAL(8, 2) NULL,
    `allday` BOOLEAN NOT NULL DEFAULT false,
    `allday_guest_nos` INTEGER NULL,
    `allday_serving_time` VARCHAR(8) NULL,
    `allday_cost_per_item` DECIMAL(8, 2) NULL,
    `allday_comments` VARCHAR(500) NULL,
    `allday_total_cost` DECIMAL(8, 2) NULL,
    `total_cost` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `is_editable` BOOLEAN NOT NULL DEFAULT true,
    `date_created` DATE NOT NULL,
    `date_modified` DATE NOT NULL,

    PRIMARY KEY (`booking_food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(64) NOT NULL,
    `ref_address_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `status_notify` BOOLEAN NOT NULL,
    `private_mode` BOOLEAN NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_lunch_detail` (
    `booking_lunch_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_lunch_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_pm_break_detail` (
    `booking_pm_break_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`booking_pm_break_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_portfolio` (
    `portfolio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `portfolio_name` VARCHAR(64) NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_sms_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_booking_id` INTEGER NOT NULL,
    `ref_subscriber_id` INTEGER NOT NULL,
    `sender_number` VARCHAR(24) NOT NULL,
    `receiver_number` VARCHAR(24) NOT NULL,
    `message` VARCHAR(512) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `sms_type` BOOLEAN NOT NULL DEFAULT true,
    `status_queue` BOOLEAN NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_booking_subscriber` (
    `subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `institution` VARCHAR(64) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(128) NOT NULL,
    `sub_role` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL,
    `attachments` BOOLEAN NOT NULL DEFAULT true,
    `text_message` BOOLEAN NOT NULL DEFAULT true,
    `admin_approval` BOOLEAN NOT NULL,
    `ijkc` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_breakfast_detail` (
    `breakfast_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`breakfast_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_access_level` (
    `level_id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyword` VARCHAR(4) NOT NULL,
    `level_name` VARCHAR(64) NOT NULL,
    `level_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_budgeting_expense` (
    `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_team_id` INTEGER NOT NULL,
    `drpExpenseCategoryL1` INTEGER NOT NULL,
    `drpExpenseCategoryL2` INTEGER NOT NULL,
    `drpExpenseCategoryL3` INTEGER NOT NULL,
    `txtCustomCategory` VARCHAR(128) NOT NULL,
    `drpNtfCategory` INTEGER NOT NULL,
    `txtQuantity` INTEGER NOT NULL,
    `txtUnitAmt` DECIMAL(8, 2) NOT NULL,
    `txtTotalAmount` DECIMAL(8, 2) NOT NULL,
    `txtComments` TEXT NOT NULL,

    PRIMARY KEY (`expense_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_categoryl1` (
    `categoryl1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_team_id` INTEGER NOT NULL,
    `categoryl1_name` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`categoryl1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_categoryl2` (
    `categoryl2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryl2_name` VARCHAR(64) NOT NULL,
    `sort_order` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`categoryl2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_categoryl3` (
    `categoryl3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_categoryl2_id` INTEGER NOT NULL,
    `categoryl3_name` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`categoryl3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_categoryntf` (
    `categoryntf_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryntf_name` VARCHAR(64) NOT NULL,
    `sort_order` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`categoryntf_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_gl_account` (
    `gl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gl_title` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`gl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_reimbursement` (
    `rid` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_team_id` INTEGER NOT NULL,
    `txtSubmitterName` VARCHAR(64) NOT NULL,
    `txtSubmitterPhone` VARCHAR(64) NOT NULL,
    `txtSubmitterEmail` VARCHAR(64) NOT NULL,
    `drpCheckPayableTo` BOOLEAN NOT NULL,
    `txtPayeeName` VARCHAR(128) NOT NULL,
    `txtStreet` VARCHAR(128) NOT NULL,
    `txtCity` VARCHAR(64) NOT NULL,
    `txtState` VARCHAR(64) NOT NULL,
    `txtStateOther` VARCHAR(64) NOT NULL,
    `drpCountry` VARCHAR(64) NOT NULL,
    `drpCountryOther` VARCHAR(64) NOT NULL,
    `txtZipcode` VARCHAR(16) NOT NULL,
    `txtPhone` VARCHAR(10) NOT NULL,
    `txtEmail` VARCHAR(128) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `status_l1` BOOLEAN NOT NULL,
    `status_l2` TINYINT NOT NULL,
    `status_l3` TINYINT NOT NULL,
    `status_l4` TINYINT NOT NULL,
    `status_l5` INTEGER NOT NULL,
    `status_l6` BOOLEAN NOT NULL,
    `status_edit` BOOLEAN NOT NULL,
    `ref_gl_id` INTEGER NOT NULL,
    `txtRejectComment` TEXT NOT NULL,

    PRIMARY KEY (`rid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_reimbursement_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_rid` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_reimbursement_expense` (
    `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_rid` INTEGER NOT NULL,
    `drpCheckPayableTo` BOOLEAN NOT NULL,
    `txtPayeeName` VARCHAR(128) NOT NULL,
    `txtStreet` VARCHAR(128) NOT NULL,
    `txtCity` VARCHAR(64) NOT NULL,
    `txtState` VARCHAR(64) NOT NULL,
    `txtStateOther` VARCHAR(64) NOT NULL,
    `drpCountry` VARCHAR(64) NOT NULL,
    `drpCountryOther` VARCHAR(64) NOT NULL,
    `txtZipcode` VARCHAR(16) NOT NULL,
    `txtPhone` VARCHAR(10) NOT NULL,
    `txtEmail` VARCHAR(128) NOT NULL,
    `drpExpenseCategoryL1` INTEGER NOT NULL,
    `drpExpenseCategoryL2` INTEGER NOT NULL,
    `drpExpenseCategoryL3` INTEGER NOT NULL,
    `txtCustomCategory` VARCHAR(128) NOT NULL,
    `drpNtfCategory` INTEGER NOT NULL,
    `txtVendor` VARCHAR(128) NOT NULL,
    `txtInvoiceNo` VARCHAR(64) NOT NULL,
    `txtInvoiceDate` DATE NOT NULL,
    `txtQuantity` INTEGER NOT NULL,
    `txtUnitAmt` DECIMAL(8, 2) NOT NULL,
    `txtTax` DECIMAL(8, 2) NOT NULL,
    `txtDonationAmt` DECIMAL(8, 2) NOT NULL,
    `txtAmount` DECIMAL(8, 2) NOT NULL,
    `txtTotalAmount` DECIMAL(8, 2) NOT NULL,
    `txtContractReq` BOOLEAN NOT NULL,
    `txtComments` TEXT NOT NULL,

    PRIMARY KEY (`expense_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_reimbursement_files` (
    `file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_id` INTEGER NOT NULL,
    `file_type` VARCHAR(64) NOT NULL,
    `new_filename` VARCHAR(128) NOT NULL,
    `real_filename` VARCHAR(128) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_budget_team` (
    `team_id` INTEGER NOT NULL AUTO_INCREMENT,
    `team_name` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_chatbox` (
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `refid` INTEGER NOT NULL,
    `page` VARCHAR(64) NOT NULL,
    `is_delete` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram` (
    `np_id` INTEGER NOT NULL AUTO_INCREMENT,
    `np_name` VARCHAR(128) NOT NULL,
    `email_address` VARCHAR(128) NOT NULL,
    `np_phone` VARCHAR(128) NOT NULL,
    `facility_name` VARCHAR(64) NOT NULL,
    `showGuestList` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `np_block` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `sent_status` BOOLEAN NOT NULL,
    `status_questionnaire` BOOLEAN NOT NULL,
    `status_hotel` BOOLEAN NOT NULL,
    `status_food` BOOLEAN NOT NULL,
    `status_registration` BOOLEAN NOT NULL,
    `status_supply` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`np_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_questionnaire` (
    `npq_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `txtEventName` VARCHAR(128) NOT NULL,
    `txtEventDate` DATE NOT NULL,
    `txtCheckIn` DATE NOT NULL,
    `txtCheckOut` DATE NOT NULL,
    `drpHotelLocation` VARCHAR(256) NOT NULL,
    `rHotelBreskfast` BOOLEAN NOT NULL,
    `txtOtherHotelLocation` VARCHAR(128) NOT NULL,
    `guest_room` TEXT NOT NULL,
    `meeting_room` TEXT NOT NULL,
    `rAvEquipments` BOOLEAN NOT NULL,
    `drpWiredMic` BOOLEAN NOT NULL,
    `drpWirelessMic` BOOLEAN NOT NULL,
    `drpPodiumMic` BOOLEAN NOT NULL,
    `txtMicRequests` VARCHAR(120) NOT NULL,
    `drpProjector` BOOLEAN NOT NULL,
    `drpPodium` BOOLEAN NOT NULL,
    `drpClicker` BOOLEAN NOT NULL,
    `drpHDMI` BOOLEAN NOT NULL,
    `drpVgaWire` BOOLEAN NOT NULL,
    `drpEasels` BOOLEAN NOT NULL,
    `drpAuxCable` BOOLEAN NOT NULL,
    `txtAVInfo` TEXT NOT NULL,
    `txtComment` TEXT NOT NULL,
    `is_editable` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`npq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_sms_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_log_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,
    `ref_driver_id` INTEGER NOT NULL,
    `user_role` VARCHAR(24) NOT NULL,
    `sender_number` VARCHAR(24) NOT NULL,
    `receiver_number` VARCHAR(24) NOT NULL,
    `txtName` VARCHAR(128) NOT NULL,
    `message` VARCHAR(512) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `sms_type` BOOLEAN NOT NULL DEFAULT true,
    `status_queue` BOOLEAN NOT NULL,
    `is_read` BOOLEAN NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2` (
    `nps_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NULL,
    `txtFirstName` VARCHAR(128) NOT NULL,
    `drpInstitution` VARCHAR(64) NOT NULL,
    `drpInstitutionOther` VARCHAR(64) NOT NULL,
    `drpPosition` VARCHAR(64) NOT NULL,
    `drpJamatiTitle` VARCHAR(64) NOT NULL,
    `txtLastName` VARCHAR(128) NOT NULL,
    `drpRegion` VARCHAR(64) NOT NULL,
    `txtEmail` VARCHAR(128) NOT NULL,
    `txtCellNumber` VARCHAR(64) NOT NULL,
    `rGender` BOOLEAN NOT NULL,
    `txtPosition` VARCHAR(128) NOT NULL,
    `rTravelAssistance` BOOLEAN NOT NULL,
    `drpTravelPlans` BOOLEAN NOT NULL,
    `txtCityDeparture` VARCHAR(128) NOT NULL,
    `chkTravelAssistanceArrival` BOOLEAN NOT NULL,
    `chkTravelAssistanceDeparture` BOOLEAN NOT NULL,
    `txtArrivalFlightNumber` VARCHAR(64) NOT NULL,
    `txtArrivalDate` DATE NOT NULL,
    `txtArrivalTime` VARCHAR(64) NOT NULL,
    `drpArrivalAirport` VARCHAR(128) NOT NULL,
    `txtArrivalAirportOther` VARCHAR(128) NOT NULL,
    `txtArrivalAirline` VARCHAR(128) NOT NULL,
    `txtDepartureFlightNumber` VARCHAR(64) NOT NULL,
    `txtDepartureDate` DATE NOT NULL,
    `txtDepartureTime` VARCHAR(64) NOT NULL,
    `drpDepartureAirport` VARCHAR(128) NOT NULL,
    `txtDepartureAirportOther` VARCHAR(128) NOT NULL,
    `txtDepartureAirline` VARCHAR(128) NOT NULL,
    `txtArrivalDateRC` DATE NOT NULL,
    `txtPickupTime` VARCHAR(64) NOT NULL,
    `txtDepartureDateRC` DATE NOT NULL,
    `txtDropOffTime` VARCHAR(64) NOT NULL,
    `rHotelAccomodation` BOOLEAN NOT NULL,
    `txtCheckIn` DATE NOT NULL,
    `txtCheckOut` DATE NOT NULL,
    `drpHotelRoomOptions` BOOLEAN NOT NULL,
    `txtHotelSharing` VARCHAR(256) NOT NULL,
    `rAttendDinner` BOOLEAN NOT NULL,
    `rVegetarianMeal` BOOLEAN NOT NULL,
    `rAttendMeeting` BOOLEAN NOT NULL,
    `rAttendDinnerFri` BOOLEAN NOT NULL,
    `rAttendDinnerSat` BOOLEAN NOT NULL,
    `rJKride` BOOLEAN NOT NULL,
    `chkAttendDinner` VARCHAR(64) NOT NULL,
    `chkJKride` VARCHAR(64) NOT NULL,
    `emergency_contact` TEXT NOT NULL,
    `txtRestrictions` TEXT NOT NULL,
    `txtAdditionalNotes` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `is_editable` BOOLEAN NOT NULL,
    `ref_driver_id` INTEGER NOT NULL,
    `ref_driver_id_d` INTEGER NOT NULL DEFAULT 0,
    `dpTime` VARCHAR(64) NOT NULL,
    `status_picked_up` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `is_volunteer` BOOLEAN NOT NULL DEFAULT false,
    `payment_collected` DECIMAL(8, 2) NULL,
    `table_number` INTEGER NULL,
    `event_id` INTEGER NOT NULL,

    PRIMARY KEY (`nps_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2_interval` (
    `interval_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interval_title` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`interval_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2_interval_topic_rel` (
    `rel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_topic_id` INTEGER NOT NULL,
    `ref_interval_id` INTEGER NOT NULL,
    `range_value` INTEGER NOT NULL,

    PRIMARY KEY (`rel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2_session` (
    `ss_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_interval_id` INTEGER NOT NULL,
    `ref_topic_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,

    PRIMARY KEY (`ss_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_nationalprogram_step2_topic` (
    `topic_id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic_title` VARCHAR(128) NOT NULL,
    `description` TEXT NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`topic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_portal_table` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `request_type` VARCHAR(100) NOT NULL,
    `arival_airline_airport_hotel` VARCHAR(200) NOT NULL,
    `arrival_flight_airport_to_hotel` VARCHAR(100) NOT NULL,
    `arrival_date_airport_to_hotel` VARCHAR(200) NOT NULL,
    `arrival_time_airport_to_hotel` VARCHAR(100) NOT NULL,
    `arrival_airport_to_hotel` VARCHAR(100) NOT NULL,
    `hotel_name_airport_to_hotel` VARCHAR(100) NOT NULL,
    `hotel_address_airport_to_hotel` VARCHAR(100) NOT NULL,
    `hotel_name_hotel_to_jkdata` VARCHAR(100) NOT NULL,
    `hotel_address_hotel_to_jkdata` VARCHAR(100) NOT NULL,
    `jkdata_hotel_to_jkdata` VARCHAR(100) NOT NULL,
    `jk_address_hotel_to_jkdata` VARCHAR(100) NOT NULL,
    `jkdata_jkdata_to_hotel` VARCHAR(100) NOT NULL,
    `jk_address_jkdata_hotel` VARCHAR(100) NOT NULL,
    `hotel_name_jkdata_to_hotel` VARCHAR(100) NOT NULL,
    `hotel_address_jkdata_to_hotel` VARCHAR(100) NOT NULL,
    `hotel_name_hotel_to_airport` VARCHAR(100) NOT NULL,
    `hotel_address_hotel_to_airport` VARCHAR(100) NOT NULL,
    `arival_airline_hotel_airport` VARCHAR(100) NOT NULL,
    `arrival_flight_hotel_to_airport` VARCHAR(100) NOT NULL,
    `arrival_date_hotel_to_airport` VARCHAR(100) NOT NULL,
    `arrival_time_hotel_to_airport` VARCHAR(100) NOT NULL,
    `arrival_airporthotel_to_airport` VARCHAR(100) NOT NULL,
    `created_date` VARCHAR(100) NOT NULL,
    `pickup_location` VARCHAR(255) NULL,
    `pickup_date` VARCHAR(255) NULL DEFAULT '',
    `pickup_time` VARCHAR(100) NULL,
    `dropoff_location` VARCHAR(255) NULL,
    `dropoff_date` VARCHAR(255) NULL,
    `dropoff_time` VARCHAR(255) NULL,
    `ref_driver_id` INTEGER NULL,
    `ref_driver_id_d` INTEGER NULL,
    `dpTime` VARCHAR(64) NULL,
    `secret_key` VARCHAR(50) NULL,
    `arrival_cancelled_by_user` BOOLEAN NULL DEFAULT false,
    `departure_cancelled_by_user` BOOLEAN NULL DEFAULT false,
    `arrival_flight_delayed` BOOLEAN NULL DEFAULT false,
    `departure_flight_delayed` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dev_transport_req_user_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone_no` INTEGER NOT NULL,
    `gender` VARCHAR(100) NOT NULL,
    `date_added` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_dinner_detail` (
    `dinner_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`dinner_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_name` VARCHAR(100) NOT NULL,
    `hotel` VARCHAR(100) NULL,
    `event_start` VARCHAR(1000) NULL,
    `event_end` VARCHAR(1000) NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` VARCHAR(100) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_food_support_subscriber` (
    `food_support_subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `sub_role` VARCHAR(50) NOT NULL DEFAULT '0',
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`food_support_subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_individual_profile` (
    `profile_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_address_id` INTEGER NOT NULL,
    `person_name` VARCHAR(64) NOT NULL,
    `age` INTEGER NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `education` VARCHAR(100) NULL,
    `education_other` VARCHAR(100) NULL,
    `comment` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `occupation` VARCHAR(100) NULL,
    `linkedin` VARCHAR(300) NULL,
    `volunteer_profile_institution` VARCHAR(100) NULL,

    PRIMARY KEY (`profile_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_ismaili_insight` (
    `form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_number` INTEGER NOT NULL,
    `ismaili_insight_txtDate1` DATE NOT NULL,
    `ismaili_insight_txtDate2` DATE NOT NULL,
    `type_of_submission` VARCHAR(64) NOT NULL,
    `submission_title` VARCHAR(128) NOT NULL,
    `ismaili_insight_short_text` TEXT NOT NULL,
    `ismaili_insight_other_inststructions` TEXT NOT NULL,

    PRIMARY KEY (`form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_ismaili_insight_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_id` INTEGER NOT NULL,
    `new_filename` VARCHAR(100) NOT NULL,
    `real_filename` VARCHAR(100) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_ismaili_insight_old` (
    `form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_number` INTEGER NOT NULL,
    `portfolio` VARCHAR(64) NOT NULL,
    `SubmittedBy` VARCHAR(64) NOT NULL,
    `contact` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `program` VARCHAR(128) NOT NULL,
    `dateprogram` VARCHAR(64) NOT NULL,
    `timeprogram` VARCHAR(64) NOT NULL,
    `venue` VARCHAR(256) NOT NULL,
    `reviewed` INTEGER NOT NULL,
    `committee` VARCHAR(500) NOT NULL,
    `comments` TEXT NULL,
    `date_of_1st_publication` DATE NOT NULL,
    `date_of_2nd_publication` DATE NOT NULL,
    `type_of_submission` VARCHAR(50) NOT NULL,
    `submission_title` VARCHAR(100) NOT NULL,
    `short_text` LONGTEXT NOT NULL,
    `other_inststructions` LONGTEXT NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jamati_program` (
    `jamatiprogram_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `age` TINYINT NOT NULL,
    `cell_phone` VARCHAR(24) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `jk` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`jamatiprogram_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_assigned` (
    `auto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_jk_id` INTEGER NOT NULL,
    `ref_data_id` INTEGER NOT NULL,
    `carCount` INTEGER NULL,
    `shoeCountGents` INTEGER NULL,
    `shoeCountLadies` INTEGER NULL,
    `shortlink` VARCHAR(128) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `send_timestamp` VARCHAR(15) NULL,
    `date_added` DATETIME(0) NULL,
    `date_modified` DATETIME(0) NULL,

    PRIMARY KEY (`auto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_data` (
    `data_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_jk` DATE NOT NULL,
    `ref_title_id` INTEGER NOT NULL,
    `time_send` VARCHAR(64) NOT NULL,
    `ref_timestamp` INTEGER NOT NULL,
    `status_sent` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`data_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_name` (
    `jk_id` INTEGER NOT NULL AUTO_INCREMENT,
    `txtName` VARCHAR(512) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`jk_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_rides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_id` INTEGER NOT NULL,
    `nps_id` INTEGER NOT NULL,
    `np_id` INTEGER NOT NULL,
    `npq_id` INTEGER NULL,
    `date` VARCHAR(10) NOT NULL,
    `pickup_time` VARCHAR(10) NOT NULL,
    `enable` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date_added` VARCHAR(40) NOT NULL,
    `date_modified` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_sms_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_auto_id` INTEGER NOT NULL,
    `ref_subscriber_id` INTEGER NOT NULL,
    `fullname` VARCHAR(64) NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `message` VARCHAR(256) NOT NULL,
    `message_type` TINYTEXT NOT NULL,
    `status_queue` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_subscriber` (
    `subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_jk_id` INTEGER NOT NULL,
    `institution` VARCHAR(64) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(128) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_jk_title` (
    `title_id` INTEGER NOT NULL AUTO_INCREMENT,
    `txtTitle` VARCHAR(512) NOT NULL,
    `sort_order` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`title_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_language` (
    `language_id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_name` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`language_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_lunch_detail` (
    `lunch_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`lunch_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_meeting_day_food` (
    `meeting_day_food_id` INTEGER NOT NULL AUTO_INCREMENT,
    `npf_id` INTEGER NOT NULL,
    `meeting_date` DATE NOT NULL,
    `day_num` INTEGER NOT NULL,
    `breakfast` BOOLEAN NOT NULL DEFAULT false,
    `breakfast_non_veg_guest` INTEGER NULL,
    `breakfast_veg_guest` INTEGER NULL,
    `breakfast_serving_time` VARCHAR(8) NULL,
    `breakfast_cost_per_item` DECIMAL(8, 2) NULL,
    `breakfast_comments` VARCHAR(500) NULL,
    `breakfast_total_cost` DECIMAL(8, 2) NULL,
    `am_break` BOOLEAN NOT NULL DEFAULT false,
    `am_non_veg_guest` INTEGER NULL,
    `am_veg_guest` INTEGER NULL,
    `am_serving_time` VARCHAR(8) NULL,
    `am_cost_per_item` DECIMAL(8, 2) NULL,
    `am_break_comments` VARCHAR(500) NULL,
    `am_total_cost` DECIMAL(8, 2) NULL,
    `lunch` BOOLEAN NOT NULL DEFAULT false,
    `lunch_non_veg_guest` INTEGER NULL,
    `lunch_veg_guest` INTEGER NULL,
    `lunch_serving_time` VARCHAR(8) NULL,
    `lunch_cost_per_item` DECIMAL(8, 2) NULL,
    `lunch_cuisine_item` INTEGER NULL,
    `lunch_comments` VARCHAR(500) NULL,
    `lunch_total_cost` DECIMAL(8, 2) NULL,
    `pm_break` BOOLEAN NOT NULL DEFAULT false,
    `pm_non_veg_guest` INTEGER NULL,
    `pm_veg_guest` INTEGER NULL,
    `pm_serving_time` VARCHAR(8) NULL,
    `pm_cost_per_item` DECIMAL(8, 2) NULL,
    `pm_break_comments` VARCHAR(500) NULL,
    `pm_total_cost` DECIMAL(8, 2) NULL,
    `dinner` BOOLEAN NOT NULL DEFAULT false,
    `dinner_non_veg_guest` INTEGER NULL,
    `dinner_veg_guest` INTEGER NULL,
    `dinner_serving_time` VARCHAR(8) NULL,
    `dinner_cost_per_item` DECIMAL(8, 2) NULL,
    `dinner_cuisine_item` INTEGER NULL,
    `dinner_comments` VARCHAR(500) NULL,
    `dinner_total_cost` DECIMAL(8, 2) NULL,
    `allday` BOOLEAN NOT NULL DEFAULT false,
    `allday_guest_nos` INTEGER NULL,
    `allday_serving_time` VARCHAR(8) NULL,
    `allday_cost_per_item` DECIMAL(8, 2) NULL,
    `allday_comments` VARCHAR(500) NULL,
    `allday_total_cost` DECIMAL(8, 2) NULL,
    `total_cost` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `date_created` DATE NOT NULL,
    `date_modified` DATE NOT NULL,
    `breakfast_gluten_free_meal` INTEGER NULL,
    `lunch_gluten_free_meal` INTEGER NULL,
    `dinner_gluten_meal` INTEGER NULL,

    PRIMARY KEY (`meeting_day_food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram` (
    `np_id` INTEGER NOT NULL AUTO_INCREMENT,
    `np_name` VARCHAR(128) NOT NULL,
    `email_address` VARCHAR(128) NOT NULL,
    `np_phone` VARCHAR(128) NOT NULL,
    `facility_name` VARCHAR(64) NULL,
    `showGuestList` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `np_block` BOOLEAN NULL,
    `status` BOOLEAN NULL,
    `sent_status` BOOLEAN NULL,
    `status_questionnaire` BOOLEAN NULL,
    `status_hotel` BOOLEAN NULL,
    `status_food` BOOLEAN NULL,
    `status_registration` BOOLEAN NULL,
    `is_editable` BOOLEAN NOT NULL DEFAULT true,
    `hotel_editable` BOOLEAN NOT NULL DEFAULT true,
    `status_supply` BOOLEAN NULL DEFAULT false,
    `secret_key` VARCHAR(50) NULL,

    PRIMARY KEY (`np_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_additional` (
    `npa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `question` VARCHAR(256) NOT NULL,
    `options` VARCHAR(256) NOT NULL,
    `type` VARCHAR(16) NOT NULL,
    `sort_order` BOOLEAN NULL,
    `required` BOOLEAN NOT NULL,

    PRIMARY KEY (`npa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_additional_answer` (
    `naa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_nps_id` INTEGER NOT NULL,
    `ref_npa_id` INTEGER NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`naa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_driver` (
    `driver_id` INTEGER NOT NULL AUTO_INCREMENT,
    `driver_name` VARCHAR(128) NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `chkAirport` VARCHAR(64) NULL,
    `jk_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`driver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_food` (
    `npf_id` INTEGER NOT NULL AUTO_INCREMENT,
    `np_id` INTEGER NOT NULL,
    `need_goodie_bag` BOOLEAN NULL,
    `nos_of_goodie_bag` INTEGER NULL,
    `cost_per_goodie_bag` DECIMAL(8, 2) NULL,
    `total_goodie_bag_cost` DECIMAL(8, 2) NULL,
    `goodie_comments` VARCHAR(500) NULL,
    `lock_form` BOOLEAN NOT NULL DEFAULT false,
    `is_editable` BOOLEAN NOT NULL DEFAULT true,
    `total_cost` DECIMAL(8, 2) NULL,
    `date_created` DATE NULL,
    `date_modified` DATE NULL,

    PRIMARY KEY (`npf_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_foodmenu` (
    `fm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `ServingDate` DATE NOT NULL,
    `ServingTime` VARCHAR(64) NOT NULL,
    `ServingCount` INTEGER NOT NULL,
    `ref_category_id` INTEGER NOT NULL,
    `ref_food_id` INTEGER NOT NULL,
    `totalCost` DECIMAL(8, 2) NOT NULL,
    `userComment` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`fm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_foodmenu_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_np_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_foodmenu_other` (
    `other_fm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `ref_fm_id` INTEGER NOT NULL,
    `ref_category_id` INTEGER NOT NULL,
    `food_name` VARCHAR(64) NOT NULL,
    `restaurant_name` VARCHAR(64) NOT NULL,
    `ingredient_name` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`other_fm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_formbuilder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_type` VARCHAR(32) NOT NULL,
    `uid` INTEGER NOT NULL,
    `predefined` BOOLEAN NOT NULL,
    `keyword` VARCHAR(32) NOT NULL,
    `field_name` VARCHAR(128) NOT NULL,
    `field_type` VARCHAR(32) NOT NULL,
    `field_values` TEXT NOT NULL,
    `default_values` VARCHAR(128) NOT NULL,
    `required` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_goodie_bag_detail` (
    `goodie_bag_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `npf_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,
    `date_created` DATE NOT NULL,
    `date_modified` DATE NOT NULL,

    PRIMARY KEY (`goodie_bag_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_hotel` (
    `hotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_name` VARCHAR(64) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `hotel_location` BOOLEAN NULL,
    `hotel_poc` VARCHAR(255) NULL,
    `hotel_layout_file_path` VARCHAR(500) NULL,
    `hotel_layout_file_name` VARCHAR(255) NULL,
    `hotel_poc_email` VARCHAR(255) NULL,

    PRIMARY KEY (`hotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_hotel_location` (
    `hotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_name` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`hotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_hotel_price` (
    `npq_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `txtHotelPrice` DECIMAL(6, 2) NOT NULL,
    `chkBreakfast` BOOLEAN NOT NULL,
    `txtHotelName` VARCHAR(128) NOT NULL,
    `txtHotelAddress` VARCHAR(256) NOT NULL,
    `txtCity` VARCHAR(64) NOT NULL,
    `txtState` VARCHAR(64) NOT NULL,
    `txtZipcode` VARCHAR(24) NOT NULL,
    `txtPhone` VARCHAR(64) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `hotel_status` BOOLEAN NOT NULL DEFAULT false,
    `txtComments` TEXT NOT NULL,

    PRIMARY KEY (`npq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_hotel_price_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_np_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_predefined` (
    `pre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `chkRolePosition` BOOLEAN NOT NULL,
    `chkRideJK` BOOLEAN NOT NULL,
    `chkDinnerFri` BOOLEAN NOT NULL,
    `chkDinnerSat` BOOLEAN NOT NULL,
    `chkAllergies` BOOLEAN NOT NULL,
    `chkRolePosition_required` BOOLEAN NOT NULL DEFAULT false,
    `chkRideJK_required` BOOLEAN NOT NULL DEFAULT false,
    `chkDinnerFri_required` BOOLEAN NOT NULL DEFAULT false,
    `chkDinnerSat_required` BOOLEAN NOT NULL DEFAULT false,
    `chkAllergies_required` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`pre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_questionnaire` (
    `npq_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `txtEventName` VARCHAR(128) NOT NULL,
    `txtEventStartDate` DATE NOT NULL,
    `txtEventEndDate` DATE NOT NULL,
    `txtEventDate` DATE NOT NULL,
    `txtCheckIn` DATE NOT NULL,
    `txtCheckOut` DATE NOT NULL,
    `drpHotelLocation` VARCHAR(256) NOT NULL,
    `rHotelBreskfast` BOOLEAN NOT NULL,
    `txtOtherHotelLocation` VARCHAR(128) NOT NULL,
    `guest_room` TEXT NOT NULL,
    `meeting_room` TEXT NOT NULL,
    `rAvEquipments` BOOLEAN NOT NULL,
    `drpWiredMic` BOOLEAN NOT NULL,
    `drpWirelessMic` BOOLEAN NOT NULL,
    `drpPodiumMic` BOOLEAN NOT NULL,
    `txtMicRequests` VARCHAR(120) NOT NULL,
    `drpProjector` BOOLEAN NOT NULL,
    `drpPodium` BOOLEAN NOT NULL,
    `drpClicker` BOOLEAN NOT NULL,
    `drpHDMI` BOOLEAN NOT NULL,
    `drpVgaWire` BOOLEAN NOT NULL,
    `drpEasels` BOOLEAN NOT NULL,
    `drpAuxCable` BOOLEAN NOT NULL,
    `txtAVInfo` TEXT NOT NULL,
    `txtComment` TEXT NOT NULL,
    `is_editable` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`npq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_questionnaire_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_np_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_sms_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_log_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,
    `ref_driver_id` INTEGER NOT NULL,
    `user_role` VARCHAR(24) NOT NULL,
    `sender_number` VARCHAR(24) NOT NULL,
    `receiver_number` VARCHAR(24) NOT NULL,
    `txtName` VARCHAR(128) NOT NULL,
    `message` VARCHAR(512) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `sms_type` BOOLEAN NOT NULL DEFAULT true,
    `status_queue` BOOLEAN NOT NULL,
    `is_read` BOOLEAN NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2` (
    `nps_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `txtFirstName` VARCHAR(128) NOT NULL,
    `drpInstitution` VARCHAR(64) NOT NULL,
    `drpInstitutionOther` VARCHAR(64) NOT NULL,
    `drpPosition` VARCHAR(64) NOT NULL,
    `drpJamatiTitle` VARCHAR(64) NOT NULL,
    `txtLastName` VARCHAR(128) NOT NULL,
    `drpRegion` VARCHAR(64) NOT NULL,
    `txtEmail` VARCHAR(128) NOT NULL,
    `txtCellNumber` VARCHAR(64) NOT NULL,
    `rGender` BOOLEAN NOT NULL,
    `txtPosition` VARCHAR(128) NOT NULL,
    `rTravelAssistance` BOOLEAN NOT NULL,
    `drpTravelPlans` BOOLEAN NOT NULL,
    `txtCityDeparture` VARCHAR(128) NOT NULL,
    `chkTravelAssistanceArrival` BOOLEAN NOT NULL,
    `chkTravelAssistanceDeparture` BOOLEAN NOT NULL,
    `txtArrivalFlightNumber` VARCHAR(64) NOT NULL,
    `txtArrivalDate` DATE NOT NULL,
    `txtArrivalTime` VARCHAR(64) NOT NULL,
    `old_txtArrivalTime` VARCHAR(20) NULL,
    `drpArrivalAirport` VARCHAR(128) NOT NULL,
    `txtArrivalAirportOther` VARCHAR(128) NOT NULL,
    `txtArrivalAirline` VARCHAR(128) NOT NULL,
    `txtDepartureFlightNumber` VARCHAR(64) NOT NULL,
    `txtDepartureDate` DATE NOT NULL,
    `txtDepartureTime` VARCHAR(64) NOT NULL,
    `old_txtDepartureTime` VARCHAR(20) NULL,
    `drpDepartureAirport` VARCHAR(128) NOT NULL,
    `txtDepartureAirportOther` VARCHAR(128) NOT NULL,
    `txtDepartureAirline` VARCHAR(128) NOT NULL,
    `txtArrivalDateRC` DATE NOT NULL,
    `txtPickupTime` VARCHAR(64) NOT NULL,
    `txtDepartureDateRC` DATE NOT NULL,
    `txtDropOffTime` VARCHAR(64) NOT NULL,
    `rHotelAccomodation` BOOLEAN NOT NULL,
    `txtCheckIn` DATE NOT NULL,
    `txtCheckOut` DATE NOT NULL,
    `drpHotelRoomOptions` BOOLEAN NOT NULL,
    `txtHotelSharing` VARCHAR(256) NOT NULL,
    `rAttendDinner` BOOLEAN NOT NULL,
    `rVegetarianMeal` BOOLEAN NOT NULL,
    `rAttendMeeting` BOOLEAN NOT NULL,
    `rAttendDinnerFri` BOOLEAN NOT NULL,
    `rAttendDinnerSat` BOOLEAN NOT NULL,
    `rJKride` BOOLEAN NOT NULL,
    `chkAttendDinner` VARCHAR(64) NOT NULL,
    `chkJKride` VARCHAR(64) NOT NULL,
    `emergency_contact` TEXT NOT NULL,
    `txtRestrictions` TEXT NOT NULL,
    `txtAdditionalNotes` TEXT NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `is_editable` BOOLEAN NOT NULL,
    `ref_driver_id` INTEGER NOT NULL,
    `ref_driver_id_d` INTEGER NOT NULL DEFAULT 0,
    `dpTime` VARCHAR(64) NOT NULL,
    `status_picked_up` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `is_volunteer` BOOLEAN NOT NULL DEFAULT false,
    `payment_collected` DECIMAL(8, 2) NULL,
    `table_number` INTEGER NULL,
    `secret_key` VARCHAR(100) NULL,
    `updated_columns` VARCHAR(500) NULL,
    `arrival_cancelled_by_user` BOOLEAN NULL DEFAULT false,
    `departure_cancelled_by_user` BOOLEAN NULL DEFAULT false,
    `arrival_flight_delayed` BOOLEAN NULL,
    `departure_flight_delayed` BOOLEAN NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`nps_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2_interval` (
    `interval_id` INTEGER NOT NULL AUTO_INCREMENT,
    `interval_title` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`interval_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2_interval_topic_rel` (
    `rel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_topic_id` INTEGER NOT NULL,
    `ref_interval_id` INTEGER NOT NULL,
    `range_value` INTEGER NOT NULL,

    PRIMARY KEY (`rel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2_session` (
    `ss_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_interval_id` INTEGER NOT NULL,
    `ref_topic_id` INTEGER NOT NULL,
    `ref_nps_id` INTEGER NOT NULL,

    PRIMARY KEY (`ss_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step2_topic` (
    `topic_id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic_title` VARCHAR(128) NOT NULL,
    `description` TEXT NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`topic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_step_hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,
    `txtMeetingRoomCost` VARCHAR(10) NULL,
    `txtSleepingRoomCost` VARCHAR(10) NULL,
    `rBreakfastIncluded` BOOLEAN NULL,
    `rWifiIncludedMR` BOOLEAN NULL,
    `rWifiIncludedSR` BOOLEAN NULL,
    `rHotelShuttle` BOOLEAN NULL,
    `beo_new_filename` VARCHAR(128) NULL,
    `beo_real_filename` VARCHAR(128) NULL,
    `contract_new_filename` VARCHAR(128) NULL,
    `contract_real_filename` VARCHAR(128) NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_subscriber` (
    `subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `sub_role` VARCHAR(50) NOT NULL DEFAULT '0',
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_summary` (
    `summary_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `meeting_relations_cost` DECIMAL(8, 0) NULL,
    `transportation_cost` DECIMAL(8, 0) NULL,
    `new_filename` VARCHAR(128) NULL,
    `real_filename` VARCHAR(128) NULL,
    `date_created` DATE NOT NULL,
    `date_modified` DATE NOT NULL,

    PRIMARY KEY (`summary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_supply` (
    `npq_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_np_id` INTEGER NOT NULL,
    `drpSupplyBox` BOOLEAN NOT NULL,
    `drpFlipChart` BOOLEAN NOT NULL,
    `rProjectorScreen` BOOLEAN NOT NULL,
    `rExtensions` INTEGER NOT NULL DEFAULT 0,
    `rSurgeProtectors` INTEGER NOT NULL DEFAULT 0,
    `drpEasels` TINYINT NOT NULL DEFAULT 0,
    `drpAudio` TINYINT NOT NULL DEFAULT 0,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `supply_status` BOOLEAN NOT NULL DEFAULT false,
    `txtComments` TEXT NOT NULL,
    `lost_speaker` TINYINT NOT NULL DEFAULT 0,
    `lost_vga` TINYINT NOT NULL DEFAULT 0,
    `lost_screen` TINYINT NOT NULL DEFAULT 0,
    `lost_extension` TINYINT NOT NULL DEFAULT 0,
    `lost_surge_protector` TINYINT NOT NULL DEFAULT 0,
    `lost_audio` TINYINT NOT NULL DEFAULT 0,
    `lost_mic` TINYINT NOT NULL DEFAULT 0,
    `lost_easel` TINYINT NOT NULL DEFAULT 0,
    `lost_flipchart` TINYINT NOT NULL DEFAULT 0,
    `lost_thunderbolt` TINYINT NOT NULL DEFAULT 0,
    `lost_surge` TINYINT NOT NULL DEFAULT 0,
    `lost_hdmi` TINYINT NOT NULL DEFAULT 0,
    `lost_clicker` TINYINT NOT NULL DEFAULT 0,
    `lost_projector` TINYINT NOT NULL DEFAULT 0,
    `meeting_relations_cost` TINYINT NOT NULL DEFAULT 0,
    `total` DECIMAL(8, 0) NOT NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`npq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_nationalprogram_supply_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_comment_id` INTEGER NOT NULL,
    `ref_np_id` INTEGER NOT NULL,
    `ref_admin_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `status` TINYINT NOT NULL,
    `message_type` BOOLEAN NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_pm_break_detail` (
    `pm_break_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meeting_day_food_id` INTEGER NULL,
    `food_id` INTEGER NULL,
    `date_created` DATE NULL,

    PRIMARY KEY (`pm_break_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_portalupdates` (
    `update_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `txtEmail` VARCHAR(128) NOT NULL,
    `cost_per_person` DECIMAL(6, 2) NOT NULL,
    `ref_restaurant_id` INTEGER NOT NULL,
    `ref_category_id` INTEGER NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `priority` BOOLEAN NOT NULL,
    `txtSubmittedBy` VARCHAR(255) NULL,

    PRIMARY KEY (`update_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_portalupdates_category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_portfolio` (
    `portfolio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(64) NOT NULL,
    `big_rocks` VARCHAR(512) NOT NULL,
    `status` TINYINT NOT NULL,

    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_portfolios` (
    `portfolio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `txtPortfolio` VARCHAR(128) NOT NULL,
    `txtBigRocks` TEXT NOT NULL,
    `ref_category` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_portfolios_category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(64) NOT NULL,
    `bigrocks` TEXT NOT NULL,
    `sort_order` INTEGER NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_reimbursement` (
    `reimbursement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth_key` VARCHAR(256) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `amount` DECIMAL(8, 2) NOT NULL,
    `event_name` VARCHAR(64) NOT NULL,
    `event_venue` VARCHAR(200) NOT NULL,
    `type_of_event` VARCHAR(200) NOT NULL,
    `event_start_date` DATE NULL,
    `host_institution` VARCHAR(200) NULL,
    `host_contact_name` VARCHAR(200) NOT NULL,
    `other_host_institution` VARCHAR(256) NULL,
    `reason` VARCHAR(256) NOT NULL,
    `payable` VARCHAR(500) NULL,
    `comment` VARCHAR(256) NOT NULL,
    `email_sent` BOOLEAN NOT NULL DEFAULT false,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `status_public` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`reimbursement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_reimbursement_draft` (
    `draft_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assigned_ids` VARCHAR(256) NOT NULL,
    `email_to` VARCHAR(256) NOT NULL,
    `subject` VARCHAR(128) NOT NULL,
    `message` TEXT NOT NULL,
    `total_amt` DECIMAL(10, 2) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`draft_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_reimbursement_files` (
    `file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_id` INTEGER NOT NULL,
    `public_ref_id` INTEGER NOT NULL,
    `session_id` VARCHAR(64) NOT NULL,
    `new_filename` VARCHAR(128) NOT NULL,
    `real_filename` VARCHAR(128) NOT NULL,
    `rstatus` TINYINT NOT NULL DEFAULT 0,
    `receipt_amt` DECIMAL(8, 2) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,
    `receipt_vendor` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_reimbursement_public` (
    `reimbursement_public_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reimbursement_id` INTEGER NOT NULL,
    `auth_key` VARCHAR(256) NOT NULL,
    `name` VARCHAR(64) NULL,
    `email` VARCHAR(256) NULL,
    `phone` VARCHAR(64) NULL,
    `amount` DECIMAL(8, 2) NOT NULL,
    `event_name` VARCHAR(64) NULL,
    `reason` VARCHAR(256) NULL,
    `payable` VARCHAR(256) NOT NULL,
    `payment_method` VARCHAR(256) NOT NULL,
    `comment` VARCHAR(256) NULL,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `forwarded_ip` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(256) NOT NULL,
    `session_id` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `payment_user_id` VARCHAR(256) NULL,

    PRIMARY KEY (`reimbursement_public_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_reimbursement_subscriber` (
    `reimbursement_subscriber_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_of_event` VARCHAR(64) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`reimbursement_subscriber_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_restaurant` (
    `restaurant_id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurant_name` VARCHAR(64) NOT NULL,
    `restaurant_location` BOOLEAN NULL,
    `restaurant_address` VARCHAR(255) NOT NULL,
    `restaurant_phone` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_restaurant_category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(64) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_restaurant_food` (
    `food_id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_name` VARCHAR(64) NOT NULL,
    `cost_per_person` DECIMAL(6, 2) NOT NULL,
    `ref_restaurant_id` INTEGER NOT NULL,
    `ref_category_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_restaurant_ingredient` (
    `auto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_food_id` INTEGER NOT NULL,
    `ingredient_name` VARCHAR(64) NOT NULL,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`auto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_shorturl` (
    `sl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortUrl` VARCHAR(256) NULL,
    `longUrl` VARCHAR(512) NULL,

    PRIMARY KEY (`sl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_shorturl_copy` (
    `sl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortUrl` VARCHAR(256) NULL,
    `longUrl` VARCHAR(512) NULL,

    PRIMARY KEY (`sl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_special_transportation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `request_type` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `event_id` INTEGER NOT NULL,
    `cell_phone` VARCHAR(20) NOT NULL,
    `travel_assistance` BOOLEAN NOT NULL DEFAULT false,
    `pickup_location_type` INTEGER NULL,
    `dropoff_location_type` INTEGER NULL,
    `airline` VARCHAR(100) NULL,
    `flight_number` VARCHAR(100) NULL,
    `airport_pickup_location` VARCHAR(100) NOT NULL,
    `flight_pickup_date` VARCHAR(20) NOT NULL,
    `flight_pickup_time` VARCHAR(20) NOT NULL,
    `old_flight_pickup_time` VARCHAR(20) NULL,
    `dropoff_location` VARCHAR(100) NOT NULL,
    `dropoff_date` VARCHAR(20) NOT NULL,
    `dropoff_time` VARCHAR(20) NOT NULL,
    `jk_id1` INTEGER NULL,
    `jk_id2` INTEGER NULL,
    `comment` VARCHAR(255) NULL,
    `driver_id` INTEGER NULL,
    `dp_time` VARCHAR(10) NULL,
    `secret_key` VARCHAR(50) NOT NULL,
    `cancelled_by_user` BOOLEAN NOT NULL DEFAULT false,
    `flight_delayed` BOOLEAN NOT NULL DEFAULT false,
    `updated_columns` VARCHAR(500) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `date_added` DATETIME(0) NOT NULL,
    `date_modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_states` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` CHAR(2) NOT NULL,
    `name` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_text_templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text_name` VARCHAR(500) NOT NULL,
    `text_message` VARCHAR(1000) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `date_added` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_volunteer_payment` (
    `volunteer_payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reimbursement_id` INTEGER NOT NULL,
    `event_name` VARCHAR(256) NULL,
    `event_start_date` DATE NULL,
    `reimbursement_type` VARCHAR(256) NULL,
    `reimbursement_type_other` VARCHAR(256) NULL,
    `volunteer_name` VARCHAR(70) NOT NULL,
    `payment_method` VARCHAR(256) NOT NULL,
    `amount` VARCHAR(10) NOT NULL,
    `check_number` VARCHAR(50) NULL,
    `payment_user_id` VARCHAR(100) NULL,
    `payment_date` DATE NOT NULL,
    `payment_status` BOOLEAN NOT NULL DEFAULT false,
    `comment` VARCHAR(256) NULL,

    PRIMARY KEY (`volunteer_payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ur_volunteer_profile_institutions` (
    `institution_id` INTEGER NOT NULL AUTO_INCREMENT,
    `institution_name` VARCHAR(64) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`institution_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `isSuperAdmin` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_user_name_key`(`user_name`),
    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `permissions` JSON NULL,
    `redirect_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role` (
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `roleId` MEDIUMINT UNSIGNED NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_user_roles` (
    `A` MEDIUMINT UNSIGNED NOT NULL,
    `B` MEDIUMINT UNSIGNED NOT NULL,

    UNIQUE INDEX `_user_roles_AB_unique`(`A`, `B`),
    INDEX `_user_roles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user_roles` ADD CONSTRAINT `_user_roles_A_fkey` FOREIGN KEY (`A`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user_roles` ADD CONSTRAINT `_user_roles_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
