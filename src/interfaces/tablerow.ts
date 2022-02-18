export interface Mydata {
  data: WelcomeData;
  kids: WelcomeKids;
}

interface WelcomeData {
  "Identification number": string;
  Name:                    string;
  Gender:                  string;
  Risk:                    string;
  "Hair length":           string;
  IQ:                      string;
  "Admission date":        string;
  "Last breakdown":        string;
  "Yearly fee":            string;
  "Knows the Joker?":      string;
}

interface WelcomeKids {
  has_relatives?: HasRelatives;
}

interface HasRelatives {
  records: HasRelativesRecord[];
}

interface HasRelativesRecord {
  data: PurpleData;
  kids: PurpleKids;
}

interface PurpleData {
  "Relative ID":         string;
  "Patient ID":          string;
  "Is alive?":           string;
  "Frequency of visits": string;
}

interface PurpleKids {
  has_phone?: HasPhone;
}

interface HasPhone {
  records: HasPhoneRecord[];
}

interface HasPhoneRecord {
  data: FluffyData;
  kids: FluffyKids;
}

interface FluffyData {
  "Phone ID":           string;
  "ID of the relative": string;
  Phone:                string;
}

interface FluffyKids {
}
