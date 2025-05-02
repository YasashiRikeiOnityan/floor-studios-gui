import { ApiGetTenantSettingsTShirtFit } from "@/lib/api";
import { ApiGetTenantSettingsTShirtFitResponse, TenantSettingsTShirtFit } from "@/lib/type";

export const GetTenantSettingsFitInteractor = async (): Promise<TenantSettingsTShirtFit> => {
  const response = await ApiGetTenantSettingsTShirtFit();
  return mapTenantSettingsFit(response);
};

const mapTenantSettingsFit = (response: ApiGetTenantSettingsTShirtFitResponse): TenantSettingsTShirtFit => {
  return {
    fits: response.fits.map((fit) => ({
      fitName: fit.fit_name,
      totalLength: {
        xxs: fit.total_length?.xxs || 0,
        xs: fit.total_length?.xs || 0,
        s: fit.total_length?.s || 0,
        m: fit.total_length?.m || 0,
        l: fit.total_length?.l || 0,
        xl: fit.total_length?.xl || 0,
        xxl: fit.total_length?.xxl || 0,
      },
      chestWidth: {
        xxs: fit.chest_width?.xxs || 0,
        xs: fit.chest_width?.xs || 0,
        s: fit.chest_width?.s || 0,
        m: fit.chest_width?.m || 0,
        l: fit.chest_width?.l || 0,
        xl: fit.chest_width?.xl || 0,
        xxl: fit.chest_width?.xxl || 0,
      },
      bottomWidth: {
        xxs: fit.bottom_width?.xxs || 0,
        xs: fit.bottom_width?.xs || 0,
        s: fit.bottom_width?.s || 0,
        m: fit.bottom_width?.m || 0,
        l: fit.bottom_width?.l || 0,
        xl: fit.bottom_width?.xl || 0,
        xxl: fit.bottom_width?.xxl || 0,
      },
      sleeveLength: {
        xxs: fit.sleeve_length?.xxs || 0,
        xs: fit.sleeve_length?.xs || 0,
        s: fit.sleeve_length?.s || 0,
        m: fit.sleeve_length?.m || 0,
        l: fit.sleeve_length?.l || 0,
        xl: fit.sleeve_length?.xl || 0,
        xxl: fit.sleeve_length?.xxl || 0,
      },
      armhole: {
        xxs: fit.armhole?.xxs || 0,
        xs: fit.armhole?.xs || 0,
        s: fit.armhole?.s || 0,
        m: fit.armhole?.m || 0,
        l: fit.armhole?.l || 0,
        xl: fit.armhole?.xl || 0,
        xxl: fit.armhole?.xxl || 0,
      },
      sleeveOpening: {
        xxs: fit.sleeve_opening?.xxs || 0,
        xs: fit.sleeve_opening?.xs || 0,
        s: fit.sleeve_opening?.s || 0,
        m: fit.sleeve_opening?.m || 0,
        l: fit.sleeve_opening?.l || 0,
        xl: fit.sleeve_opening?.xl || 0,
        xxl: fit.sleeve_opening?.xxl || 0,
      },
      neckRibLength: {
        xxs: fit.neck_rib_length?.xxs || 0,
        xs: fit.neck_rib_length?.xs || 0,
        s: fit.neck_rib_length?.s || 0,
        m: fit.neck_rib_length?.m || 0,
        l: fit.neck_rib_length?.l || 0,
        xl: fit.neck_rib_length?.xl || 0,
        xxl: fit.neck_rib_length?.xxl || 0,
      },
      neckOpening: {
        xxs: fit.neck_opening?.xxs || 0,
        xs: fit.neck_opening?.xs || 0,
        s: fit.neck_opening?.s || 0,
        m: fit.neck_opening?.m || 0,
        l: fit.neck_opening?.l || 0,
        xl: fit.neck_opening?.xl || 0,
        xxl: fit.neck_opening?.xxl || 0,
      },
      shoulderToShoulder: {
        xxs: fit.shoulder_to_shoulder?.xxs || 0,
        xs: fit.shoulder_to_shoulder?.xs || 0,
        s: fit.shoulder_to_shoulder?.s || 0,
        m: fit.shoulder_to_shoulder?.m || 0,
        l: fit.shoulder_to_shoulder?.l || 0,
        xl: fit.shoulder_to_shoulder?.xl || 0,
        xxl: fit.shoulder_to_shoulder?.xxl || 0,
      },
    })),
  };
};
