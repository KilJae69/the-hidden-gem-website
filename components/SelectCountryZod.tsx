"use client"

interface Country {
  name: string;
  flag: string;
  independent: boolean;
}

interface CountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className?: string;
  countries: Country[];
  onChange: (e: any) => void;

}
 function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
  countries
  
}: CountryProps) {


  const flag =
    countries.find((country: any) => country.name === defaultCountry)?.flag ??
    "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
