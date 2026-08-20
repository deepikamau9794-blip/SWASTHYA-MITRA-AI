import React from 'react';
import type { Facility } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Bed, Video, Clock, CheckCircle2, Navigation } from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
  onSelectReferral?: (facility: Facility) => void;
  isSelected?: boolean;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  onSelectReferral,
  isSelected = false,
}) => {
  const { language } = useLanguage();

  const typeLabels = {
    PHC: { en: 'Primary Health Centre', hi: 'प्राथमिक स्वास्थ्य केंद्र', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    CHC: { en: 'Community Health Centre', hi: 'सामुदायिक स्वास्थ्य केंद्र', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    DISTRICT_HOSPITAL: { en: 'District Hospital', hi: 'जिला अस्पताल', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    AIIMS_HUB: { en: 'AIIMS Super-Specialty Hub', hi: 'एम्स सुपर-स्पेशियलिटी हब', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    SUB_CENTRE: { en: 'Health Sub-Centre', hi: 'स्वास्थ्य उपकेंद्र', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  };

  const currentType = typeLabels[facility.type] || typeLabels.PHC;

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isSelected
          ? 'border-gov-navy bg-blue-50/70 ring-2 ring-gov-navy shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentType.color}`}>
              {language === 'hi' ? currentType.hi : currentType.en}
            </span>
            <span className="flex items-center text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              <Navigation className="w-3 h-3 text-slate-400 mr-1" />
              {facility.distanceKm} km away
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 leading-tight">
            {language === 'hi' ? facility.nameHi : facility.name}
          </h4>
        </div>
      </div>

      <div className="text-xs text-slate-600 mt-2 space-y-1">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{language === 'hi' ? facility.addressHi : facility.address}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="font-mono">{facility.phone}</span>
        </div>
      </div>

      {/* Badges strip: 24x7 Emergency, Teleconsult, Beds */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
        {facility.emergencyAvailable24x7 && (
          <span className="inline-flex items-center space-x-1 text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-bold">
            <Clock className="w-3 h-3" />
            <span>24x7 Emergency</span>
          </span>
        )}
        {facility.teleconsultLinked && (
          <span className="inline-flex items-center space-x-1 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-bold">
            <Video className="w-3 h-3" />
            <span>Teleconsult Linked</span>
          </span>
        )}
        <span className="inline-flex items-center space-x-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
          <Bed className="w-3 h-3 text-slate-500" />
          <span>{facility.availableBeds} Inpatient Beds</span>
        </span>
      </div>

      {/* Available Specialists */}
      <div className="mt-2.5 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-700">
          {language === 'hi' ? 'उपलब्ध विशेषज्ञ: ' : 'Specialists: '}
        </span>
        <span>
          {(language === 'hi' ? facility.specialistsHi : facility.specialists).join(', ')}
        </span>
      </div>

      {onSelectReferral && (
        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={() => onSelectReferral(facility)}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
              isSelected
                ? 'bg-gov-navy text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            {isSelected
              ? (language === 'hi' ? '✓ चयनित रेफरल केंद्र' : '✓ Selected for Referral')
              : (language === 'hi' ? 'इस केंद्र को रेफरल हेतु चुनें' : 'Select this Facility for Referral')}
          </button>
        </div>
      )}
    </div>
  );
};
