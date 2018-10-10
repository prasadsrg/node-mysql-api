-- CREATE TABLE log_data (DATA text, updated_on datetime DEFAULT now());


-- CREATE TABLE apex_data (
--      name varchar(30) NOT NULL,
--      code varchar(30) NOT NULL,
--      status boolean NOT NULL DEFAULT TRUE
-- );


-- ALTER TABLE apex_data ADD CONSTRAINT apex_data_uq_name_code unique(name, code);


-- CREATE TABLE apex_report ( 
--     id varchar(30) PRIMARY KEY,
--     name varchar(99) NOT NULL,
--     report_url varchar(99) NOT NULL
-- );


-- CREATE TABLE apex_report_data ( 
--     id varchar(30) PRIMARY KEY,
--     name varchar(99) NOT NULL,
--     status boolean NOT NULL DEFAULT TRUE,
--     apex_report_id varchar(30) NOT NULL
-- );


-- ALTER TABLE apex_report_data ADD CONSTRAINT apex_report_data_fk_apex_report_id FOREIGN KEY (apex_report_id) REFERENCES apex_report(id);


-- CREATE TABLE app_menu( 
--     id varchar(99) PRIMARY KEY,
--     name varchar(50) NOT NULL,
--     menu varchar(50) NOT NULL,
--     ROLE varchar(30) NOT NULL,
--                                                                                                  active boolean DEFAULT TRUE NOT NULL,
--                                                                                                                              priority int NOT NULL DEFAULT 999,
--                                                                                                                                                            updated_by varchar(30) DEFAULT 'system',
--                                                                                                                                                                                           updated_on TIMESTAMP DEFAULT now());


-- CREATE TABLE app_data( id varchar(30) PRIMARY KEY,
--                                               name varchar(50) NOT NULL,
--                                                                code varchar(50) NOT NULL,
--                                                                                 active boolean NOT NULL DEFAULT TRUE,
--                                                                                                                 updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                         updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE app_data ADD CONSTRAINT app_data_uq_name_code unique(name, code);


-- CREATE TABLE img ( id varchar(30) PRIMARY KEY,
--                                           name varchar(99) DEFAULT 'upload',
--                                                                    src longtext);


-- CREATE TABLE address ( id varchar(30) PRIMARY KEY,
--                                               lane varchar(99),
--                                                    landmark varchar(99),
--                                                             city varchar(30),
--                                                                  state varchar(30),
--                                                                        country varchar(30) DEFAULT 'India',
--                                                                                                    zipcode int(8));


-- CREATE TABLE branch( id varchar(30) PRIMARY KEY,
--                                             name varchar(30) NOT NULL,
--                                                              contact varchar(20) NOT NULL,
--                                                                                  phone varchar(20),
--                                                                                        mobile varchar(20),
--                                                                                               email varchar(50),
--                                                                                                     pan varchar(30),
--                                                                                                         tan varchar(30),
--                                                                                                             gstin varchar(30),
--                                                                                                                   lat varchar(99),
--                                                                                                                       lng varchar(99),
--                                                                                                                           address_id varchar(30),
--                                                                                                                                      img_id varchar(30),
--                                                                                                                                             active boolean NOT NULL DEFAULT TRUE,
--                                                                                                                                                                             updated_by varchar(30) DEFAULT 'system',
--                                                                                                                                                                                                            updated_on TIMESTAMP DEFAULT now());


-- ALTER TABLE branch ADD CONSTRAINT branch_fk_address_id
-- FOREIGN KEY (address_id) REFERENCES address(id);


-- ALTER TABLE branch ADD CONSTRAINT branch_fk_img_id
-- FOREIGN KEY (img_id) REFERENCES img(id);


-- CREATE TABLE PROFILE ( id varchar(30) PRIMARY KEY,
--                                               name varchar(50) NOT NULL DEFAULT 'Anonymous',
--                                                                                 mobile varchar(15) NOT NULL,
--                                                                                                    email varchar(99),
--                                                                                                          aadhar varchar(99),
--                                                                                                                 password varchar(30) NOT NULL DEFAULT '1234',
--                                                                                                                                                       password_token varchar(30),
--                                                                                                                                                                      ROLE varchar(30) NOT NULL DEFAULT 'NA',
--                                                                                                                                                                                                        address_id varchar(30) NOT NULL,
--                                                                                                                                                                                                                               branch_id varchar(30) NOT NULL,
--                                                                                                                                                                                                                                                     img_id varchar(30) NOT NULL,
--                                                                                                                                                                                                                                                                        active boolean NOT NULL DEFAULT TRUE,
--                                                                                                                                                                                                                                                                                                        updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                                                                                                                                updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE PROFILE ADD CONSTRAINT profile_fk_address_id
-- FOREIGN KEY (address_id) REFERENCES address(id);


-- ALTER TABLE PROFILE ADD CONSTRAINT profile_fk_img_id
-- FOREIGN KEY (img_id) REFERENCES img(id);


-- ALTER TABLE PROFILE ADD CONSTRAINT profile_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- CREATE TABLE driver( id varchar(30) PRIMARY KEY,
--                                             license varchar(30) NOT NULL,
--                                                                 expiration_date date, profile_id varchar(30) NOT NULL,
--                                                                                                              front_img_id varchar(30),
--                                                                                                                           back_img_id varchar(30),
--                                                                                                                                       branch_id varchar(30) NOT NULL,
--                                                                                                                                                             updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                     updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE driver ADD CONSTRAINT driver_fk_profile_id
-- FOREIGN KEY (profile_id) REFERENCES profile(id);


-- ALTER TABLE driver ADD CONSTRAINT driver_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- ALTER TABLE driver ADD CONSTRAINT driver_fk_front_img_id
-- FOREIGN KEY (front_img_id) REFERENCES img(id);


-- ALTER TABLE driver ADD CONSTRAINT driver_fk_back_img_id
-- FOREIGN KEY (back_img_id) REFERENCES img(id);


-- CREATE TABLE device( id varchar(30) PRIMARY KEY,
--                                             imei_no varchar(50),
--                                                     registration_no varchar(50),
--                                                                     activation_date date, expiration_date date, device_in varchar(30),
--                                                                                                                           unit_price bigint, sgst decimal(4,2),
--                                                                                                                                                   cgst decimal(4, 2),
--                                                                                                                                                        igst decimal(4, 2),
--                                                                                                                                                             active boolean NOT NULL DEFAULT FALSE,
--                                                                                                                                                                                             updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                     updated_on TIMESTAMP NOT NULL DEFAULT now());


-- CREATE TABLE agency_discount ( id varchar(30) PRIMARY KEY,
--                                                       discount decimal(4,2),
--                                                                branch_id varchar(30) NOT NULL,
--                                                                                      updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                              updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE agency_discount ADD CONSTRAINT agency_discount_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- CREATE TABLE agency_device ( id varchar(30) PRIMARY KEY,
--                                                     device_id varchar(30),
--                                                               payment_type varchar(30),
--                                                                            unit_price bigint, sgst decimal(4,2),
--                                                                                                    cgst decimal(4, 2),
--                                                                                                         igst decimal(4, 2),
--                                                                                                              amount bigint, paid boolean NOT NULL DEFAULT FALSE,
--                                                                                                                                                           discount decimal(4,2),
--                                                                                                                                                                    branch_id varchar(30) NOT NULL,
--                                                                                                                                                                                          updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                  updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE agency_device ADD CONSTRAINT agency_device_fk_device_id
-- FOREIGN KEY (device_id) REFERENCES device(id);


-- ALTER TABLE agency_device ADD CONSTRAINT agency_device_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- CREATE TABLE vehicle_insurance ( id varchar(30) PRIMARY KEY,
--                                                         company_name varchar(50),
--                                                                      company_number varchar(50),
--                                                                                     policy_number varchar(50),
--                                                                                                   amount bigint, effective_date date, expiration_date date, front_img_id varchar(30),
--                                                                                                                                                                          back_img_id varchar(30),
--                                                                                                                                                                                      updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                              updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE vehicle_insurance ADD CONSTRAINT vehicle_insurance_fk_front_img_id
-- FOREIGN KEY (front_img_id) REFERENCES img(id);


-- ALTER TABLE vehicle_insurance ADD CONSTRAINT vehicle_insurance_fk_back_img_id
-- FOREIGN KEY (back_img_id) REFERENCES img(id);


-- CREATE TABLE vehicle_registration ( id varchar(30) PRIMARY KEY,
--                                                            registration_no varchar(50),
--                                                                            registration_date date, registration_validity date, chassis_no varchar(50),
--                                                                                                                                           engine_no varchar(50),
--                                                                                                                                                     owner_name varchar(50),
--                                                                                                                                                                front_img_id varchar(30),
--                                                                                                                                                                             back_img_id varchar(30),
--                                                                                                                                                                                         updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                 updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE vehicle_registration ADD CONSTRAINT vehicle_registration_fk_front_img_id
-- FOREIGN KEY (front_img_id) REFERENCES img(id);


-- ALTER TABLE vehicle_registration ADD CONSTRAINT vehicle_registration_fk_back_img_id
-- FOREIGN KEY (back_img_id) REFERENCES img(id);


-- CREATE TABLE vehicle_tax ( id varchar(30) PRIMARY KEY,
--                                                   transaction_no varchar(50),
--                                                                  expiration_date varchar(50),
--                                                                                  front_img_id varchar(30),
--                                                                                               back_img_id varchar(30),
--                                                                                                           updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                   updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE vehicle_tax ADD CONSTRAINT vehicle_tax_fk_front_img_id
-- FOREIGN KEY (front_img_id) REFERENCES img(id);


-- ALTER TABLE vehicle_tax ADD CONSTRAINT vehicle_tax_fk_back_img_id
-- FOREIGN KEY (back_img_id) REFERENCES img(id);


-- CREATE TABLE vehicle ( id varchar(30) PRIMARY KEY,
--                                               imei_no varchar(50),
--                                                       vehicle_no varchar(50) NOT NULL,
--                                                                              primary_driver_id varchar(30),
--                                                                                                alternative_driver_id varchar(30),
--                                                                                                                      vehicle_condition varchar(100),
--                                                                                                                                        capacity varchar(20),
--                                                                                                                                                 vehicle_type varchar(30),
--                                                                                                                                                              vehicle_tax_id varchar(30),
--                                                                                                                                                                             vehicle_registration_id varchar(30),
--                                                                                                                                                                                                     vehicle_insurance_id varchar(30),
--                                                                                                                                                                                                                          active boolean NOT NULL DEFAULT TRUE,
--                                                                                                                                                                                                                                                          branch_id varchar(30) NOT NULL,
--                                                                                                                                                                                                                                                                                profile_id varchar(30) NOT NULL,
--                                                                                                                                                                                                                                                                                                       updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                                                                                                                               updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE vehicle ADD CONSTRAINT vehicle_fk_profile_id
-- FOREIGN KEY (profile_id) REFERENCES profile(id);


-- ALTER TABLE vehicle ADD CONSTRAINT vehicle_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- CREATE TABLE user_vehicle( id varchar(30) PRIMARY KEY,
--                                                   profile_id varchar(30) NOT NULL,
--                                                                          vehicle_id varchar(30) NOT NULL,
--                                                                                                 device_id varchar(30) NOT NULL,
--                                                                                                                       branch_id varchar(30) NOT NULL,
--                                                                                                                                             updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                     updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE user_vehicle ADD CONSTRAINT user_vehicle_fk_profile_id
-- FOREIGN KEY (profile_id) REFERENCES profile(id);


-- ALTER TABLE user_vehicle ADD CONSTRAINT user_vehicle_fk_vehicle_id
-- FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


-- ALTER TABLE user_vehicle ADD CONSTRAINT user_vehicle_fk_device_id
-- FOREIGN KEY (device_id) REFERENCES device(id);


-- ALTER TABLE user_vehicle ADD CONSTRAINT user_vehicle_fk_branch_id
-- FOREIGN KEY (branch_id) REFERENCES branch(id);


-- CREATE TABLE trip( id varchar(30) PRIMARY KEY,
--                                           imei_no varchar(50),
--                                                   profile_id varchar(30) NOT NULL,
--                                                                          vehicle_id varchar(30) NOT NULL,
--                                                                                                 primary_driver_id varchar(30),
--                                                                                                                   alternative_driver_id varchar(30),
--                                                                                                                                         avg_speed bigint DEFAULT 0,
--                                                                                                                                                                  avg_time bigint DEFAULT 0,
--                                                                                                                                                                                          avg_distance bigint DEFAULT 0,
--                                                                                                                                                                                                                      amount bigint DEFAULT 0,
--                                                                                                                                                                                                                                            trip_date date, updated_by varchar(30) NOT NULL DEFAULT 'system',
--                                                                                                                                                                                                                                                                                                    updated_on TIMESTAMP NOT NULL DEFAULT now());


-- ALTER TABLE trip ADD CONSTRAINT trip_fk_profile_id
-- FOREIGN KEY (profile_id) REFERENCES profile(id);


-- ALTER TABLE trip ADD CONSTRAINT trip_fk_vehicle_id
-- FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


-- CREATE TABLE trip_route ( id varchar(30) PRIMARY KEY,
--                                                  day_time TIMESTAMP NOT NULL DEFAULT now(),
--                                                                                      lat varchar(30),
--                                                                                          lng varchar(30),
--                                                                                              speed varchar(10),
--                                                                                                    trip_id varchar(30) NOT NULL,
--                                                                                                                        grpcode varchar(9) NOT NULL);


-- ALTER TABLE trip_route ADD CONSTRAINT trip_route_fk_trip_id
-- FOREIGN KEY (trip_id) REFERENCES trip(id);


create table log_data ( data text, updated_on datetime default now() );

create table apex_data (
    name varchar(30) not null,
    code varchar(30) not null,
    status boolean not null default true
);
alter table apex_data add constraint apex_data_uq_name_code unique( name, code);


create table apex_report (
	id varchar(30) primary key,
	name varchar(99) not null,
	report_url varchar(99) not null
);
create table apex_report_data (
	id varchar(30) primary key,
	name varchar(99) not null,
	status boolean not null default true,
	apex_report_id varchar(30) not null
);
alter table apex_report_data add constraint apex_report_data_fk_apex_report_id foreign key (apex_report_id) references apex_report(id);

create table app_menu(
	id varchar(99) primary key,
	name varchar(50) not null,
	menu varchar(50) not null,
	role varchar(30) not null,
	active boolean default true not null,
	priority int not null default 999,
	updated_by varchar(30) default 'system',
	updated_on timestamp default now()
);


create table app_data(
      id varchar(30) primary key,
      name varchar(50) not null,
      code varchar(50) not null,
      active boolean not null default true,
      updated_by varchar(30) not null default 'system',
      updated_on timestamp not null default now()
);
alter table app_data add constraint app_data_uq_name_code unique(name, code);

create table img (
     id varchar(30) primary key,
     name varchar(99) default 'upload',
     src longtext
);

create table address(
    id varchar(30) primary key,
    lane varchar(99),
    landmark varchar(99),
    city varchar(30),
    state varchar(30),
    country varchar(30) default 'India',
    zipcode int(8)
);

create table branch(
        id varchar(30) primary key,
        name varchar(30) not null,
        contact varchar(20) not null,
        phone varchar(20),
        mobile varchar(20),
        email varchar(50),
        pan varchar(30),
        tan varchar(30),
        gstin varchar(30),
        lat varchar(99),
        lng varchar(99),
        address_id varchar(30),
        img_id varchar(30),
		active boolean not null default true,
		updated_by varchar(30) default 'system',
		updated_on timestamp default now()
);
alter table branch add constraint branch_fk_address_id foreign key (address_id) references address(id);
alter table branch add constraint branch_fk_img_id foreign key (img_id) references img(id);


create table profile(
	id varchar(30) primary key,
	name varchar(50) not null default 'Anonymous',
	mobile varchar(15) not null,
	email varchar(99),
	aadhar varchar(99),
	password varchar(30) not null default '1234',
	password_token varchar(30),
	role varchar(30) not null default 'NA',
	address_id varchar(30) not null,
	branch_id varchar(30) not null,
	img_id varchar(30) not null,
	active boolean not null default true,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);

alter table profile add constraint profile_fk_address_id foreign key (address_id) references address(id);
alter table profile add constraint profile_fk_img_id foreign key (img_id) references img(id);
alter table profile add constraint profile_fk_branch_id foreign key (branch_id) references branch(id);

create table driver(
	 id varchar(30) primary key,
     license varchar(30) not null,
	 expiration_date date,
     profile_id varchar(30) not null,
     front_img_id varchar(30),
     back_img_id varchar(30),
	--  branch_id varchar(30) not null,
     updated_by varchar(30) not null default 'system',
     updated_on timestamp not null default now()
);

alter table driver add constraint driver_fk_profile_id  foreign key (profile_id ) references profile(id);
-- alter table driver add constraint driver_fk_branch_id  foreign key (branch_id ) references branch(id);
alter table driver add constraint driver_fk_front_img_id foreign key (front_img_id) references img(id);
alter table driver add constraint driver_fk_back_img_id foreign key (back_img_id) references img(id);


create table device(
      id varchar(30) primary key,
      imei_no varchar(50),
      registration_no varchar(50),
      activation_date date,
      expiration_date date,
      device_in varchar(30),
      unit_price bigint,
	  sgst decimal(4,2),
	  cgst decimal(4, 2),
	  igst decimal(4, 2),
      active boolean not null default false,
      updated_by varchar(30) not null default 'system',
      updated_on timestamp not null default now()
);

create table agency_discount (
      id varchar(30) primary key,
      discount decimal(4,2),
      branch_id varchar(30) not null,
     updated_by varchar(30) not null default 'system',
     updated_on timestamp not null default now()
);

alter table agency_discount add constraint agency_discount_fk_branch_id  foreign key (branch_id ) references branch(id);

create table agency_device (
      id varchar(30) primary key,
      payment_type varchar(30),
      unit_price bigint,
        sgst decimal(4,2),
        cgst decimal(4, 2),
        igst decimal(4, 2),
        amount bigint,
        paid boolean not null default false,        
      discount decimal(4,2),
      device_id varchar(30),
      branch_id varchar(30) not null,
     updated_by varchar(30) not null default 'system',
     updated_on timestamp not null default now()
);

alter table agency_device add constraint agency_device_fk_device_id  foreign key (device_id ) references device(id);
alter table agency_device add constraint agency_device_fk_branch_id  foreign key (branch_id ) references branch(id);

create table vehicle_insurance (
    id varchar(30) primary key,
    company_name varchar(50),
    company_number varchar(50),
    policy_number varchar(50),
    amount bigint,
    effective_date date,
    expiration_date date,
    front_img_id varchar(30),
    back_img_id varchar(30),
    updated_by varchar(30) not null default 'system',
    updated_on timestamp not null default now()
);

alter table vehicle_insurance add constraint vehicle_insurance_fk_front_img_id foreign key (front_img_id) references img(id);
alter table vehicle_insurance add constraint vehicle_insurance_fk_back_img_id foreign key (back_img_id) references img(id);

create table vehicle_registration (
    id varchar(30) primary key,
    registration_no varchar(50),
    registration_date date,
    registration_validity date,
    chassis_no varchar(50),
    engine_no varchar(50),
    owner_name varchar(50),
    front_img_id varchar(30),
    back_img_id varchar(30),
    updated_by varchar(30) not null default 'system',
    updated_on timestamp not null default now()
);

alter table vehicle_registration add constraint vehicle_registration_fk_front_img_id foreign key (front_img_id) references img(id);
alter table vehicle_registration add constraint vehicle_registration_fk_back_img_id foreign key (back_img_id) references img(id);

create table vehicle_tax (
    id varchar(30) primary key,
    transaction_no varchar(50),
    expiration_date varchar(50),
    front_img_id varchar(30),
    back_img_id varchar(30),
    updated_by varchar(30) not null default 'system',
    updated_on timestamp not null default now()
);

alter table vehicle_tax add constraint vehicle_tax_fk_front_img_id foreign key (front_img_id) references img(id);
alter table vehicle_tax add constraint vehicle_tax_fk_back_img_id foreign key (back_img_id) references img(id);

create table vehicle (
	id varchar(30) primary key,
	-- imei_no varchar(50),
	vehicle_no varchar(50) not null,
	vehicle_condition varchar(100),
	capacity  varchar(20),
	vehicle_type varchar(30),
    img_id varchar(30) not null,
	vehicle_tax_id varchar(30),
    profile_id varchar(30),
	vehicle_registration_id varchar(30),
	vehicle_insurance_id varchar(30),
    active boolean not null default true,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table vehicle add constraint vehicle_fk_profile_id  foreign key (profile_id ) references profile(id);
-- alter table vehicle add constraint vehicle_fk_branch_id  foreign key (branch_id ) references branch(id);
alter table vehicle add constraint vehicle_fk_img_id foreign key (img_id) references img(id);

alter table vehicle add constraint vehicle_fk_vehicle_tax_id foreign key (vehicle_tax_id) references vehicle_tax(id);
alter table vehicle add constraint vehicle_fk_vehicle_registration_id foreign key (vehicle_registration_id) references vehicle_registration(id);
alter table vehicle add constraint vehicle_fk_vehicle_vehicle_insurance_id foreign key (vehicle_insurance_id) references vehicle_insurance(id);
-- alter table vehicle add constraint vehicle_fk_device_id foreign key (device_id) references device(id);

create table user_vehicle(
	id varchar(30) primary key,
    primary_driver_id varchar(30) ,
	alternative_driver_id varchar(30),
	-- profile_id varchar(30) not null,
	vehicle_id varchar(30) not null,
	device_id varchar(30) not null,
	-- branch_id varchar(30) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
-- alter table user_vehicle add constraint user_vehicle_fk_profile_id  foreign key (profile_id ) references profile(id);
alter table user_vehicle add constraint user_vehicle_fk_vehicle_id   foreign key (vehicle_id) references vehicle(id);
alter table user_vehicle add constraint user_vehicle_fk_primary_driver_id foreign key (primary_driver_id) references driver(id);
alter table user_vehicle add constraint user_vehicle_fk_alternative_driver_id foreign key (alternative_driver_id) references driver(id);
alter table user_vehicle add constraint user_vehicle_fk_device_id   foreign key (device_id) references device(id);
-- alter table user_vehicle add constraint user_vehicle_fk_branch_id   foreign key (branch_id) references branch(id);



create table trip(
	id varchar(30) primary key,
	imei_no varchar(50),
	profile_id varchar(30) not null,
	vehicle_id varchar(30) not null,
	primary_driver_id varchar(30) ,
	alternative_driver_id varchar(30),
	avg_speed bigint default 0,
	avg_time bigint default 0,
	avg_distance bigint default 0,
	amount bigint default 0,
	trip_date date,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table trip add constraint trip_fk_profile_id  foreign key (profile_id ) references profile(id);
alter table trip add constraint trip_fk_vehicle_id   foreign key (vehicle_id) references vehicle(id);

create table trip_route (
	id varchar(30) primary key,
	day_time timestamp not null default now(),
	lat varchar(30),
	lng varchar(30),
	speed varchar(10),
	trip_id varchar(30) not null,
	-- grpcode varchar(9) not null
);
alter table trip_route add constraint trip_route_fk_trip_id  foreign key (trip_id ) references trip(id);