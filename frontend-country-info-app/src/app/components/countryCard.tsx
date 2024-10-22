import Image from 'next/image';
import Link from 'next/link';

const CountryCard = ({
  countryCode,
  name,
  flag,
}: {
  countryCode: string;
  name: string;
  flag: string | null;
}) => {
  return (
    <Link
      href={`/country/${countryCode}`}
      className='flex gap-2 bg-gray-200 p-4 rounded-md items-center hover:bg-gray-400 transition-colors duration-300 cursor-pointer'
    >
      {flag ? (
        <Image
          src={flag}
          alt={name}
          width={50}
          height={50}
          className='rounded'
        />
      ) : (
        <p className='font-bold p-2 bg-gray-300 rounded'>{countryCode}</p>
      )}
      <p>{name}</p>
    </Link>
  );
};

export default CountryCard;
