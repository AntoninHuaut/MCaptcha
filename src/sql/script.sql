CREATE TABLE DUSER (
  numUser INTEGER AUTO_INCREMENT,
  userId VARCHAR(64) NOT NULL UNIQUE,
  lastUsername VARCHAR(128) NOT NULL,
  CONSTRAINT PK_DUSER PRIMARY KEY(numUser)
);

CREATE TABLE GUILD (
  numGuild INTEGER AUTO_INCREMENT,
  guildId VARCHAR(64) NOT NULL UNIQUE,
  roleId VARCHAR(64) NOT NULL,
  CONSTRAINT PK_GUILD PRIMARY KEY(numGuild)
);

CREATE TABLE CHECKUSER (
  numCheck INTEGER AUTO_INCREMENT,
  keyId VARCHAR(64) NOT NULL,
  dateInsert DATETIME NOT NULL,
  validCaptcha BOOLEAN DEFAULT 0,
  numUser INTEGER NOT NULL,
  numGuild INTEGER DEFAULT NULL,
  CONSTRAINT PK_CHECKUSER PRIMARY KEY(numCheck)
);

ALTER TABLE CHECKUSER ADD FOREIGN KEY (numUser) REFERENCES DUSER(numUser); 
ALTER TABLE CHECKUSER ADD FOREIGN KEY (numGuild) REFERENCES GUILD(numGuild); 