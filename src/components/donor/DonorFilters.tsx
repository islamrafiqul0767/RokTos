import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { BANGLADESH_DIVISIONS, BLOOD_GROUPS } from '../../config/bangladeshData.ts';
import { Filter, RotateCcw } from 'lucide-react';

interface DonorFiltersProps {
  selectedDivision: string;
  onSelectDivision: (div: string) => void;
  selectedDistrict: string;
  onSelectDistrict: (dist: string) => void;
  selectedBloodGroup: string;
  onSelectBloodGroup: (bg: string) => void;
  selectedAvailability: string;
  onSelectAvailability: (avail: string) => void;
  onReset: () => void;
}

export const DonorFilters: React.FC<DonorFiltersProps> = ({
  selectedDivision,
  onSelectDivision,
  selectedDistrict,
  onSelectDistrict,
  selectedBloodGroup,
  onSelectBloodGroup,
  selectedAvailability,
  onSelectAvailability,
  onReset,
}) => {
  const { language, t } = useLanguage();

  const currentDivisionData = BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivision);
  const districtList = currentDivisionData ? currentDivisionData.districts : [];

  return (
    <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm">
          <Filter className="w-4 h-4 text-emerald-800" />
          <span>{t.filter}</span>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-emerald-800 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.clearFilters}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Blood Group */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
          </label>
          <select
            value={selectedBloodGroup}
            onChange={(e) => onSelectBloodGroup(e.target.value)}
            className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
          >
            <option value="ALL">{t.allBloodGroups}</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* Division */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {language === 'bn' ? 'বিভাগ' : 'Division'}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => {
              onSelectDivision(e.target.value);
              onSelectDistrict('ALL');
            }}
            className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
          >
            <option value="ALL">{t.allDivisions}</option>
            {BANGLADESH_DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {language === 'bn' ? div.nameBn : div.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {language === 'bn' ? 'জেলা' : 'District'}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onSelectDistrict(e.target.value)}
            disabled={selectedDivision === 'ALL'}
            className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 disabled:opacity-50"
          >
            <option value="ALL">{t.allDistricts}</option>
            {districtList.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {language === 'bn' ? dist.nameBn : dist.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {language === 'bn' ? 'প্রাপ্যতা অবস্থা' : 'Availability'}
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => onSelectAvailability(e.target.value)}
            className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
          >
            <option value="ALL">{language === 'bn' ? 'সকল অবস্থা' : 'All Availability'}</option>
            <option value="available">{t.availableNow}</option>
            <option value="temporarily_unavailable">{t.temporarilyUnavailable}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
