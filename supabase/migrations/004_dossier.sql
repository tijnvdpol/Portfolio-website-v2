-- Homepage "Controledossier": per project een stempel en de onderbouwing zoals die op de
-- homepage bij elk dossier staat. Eenmalig uitvoeren in de Supabase SQL Editor.
--
-- dossier_evidence: lijst met regels, bijv. [{"label": "Live applicatie", "href": "https://..."}].
--                   `href` is optioneel; zonder link is het een gewone onderbouwingsregel.
-- dossier_stamp:    {"label": "STATUS", "value": "LIVE", "detail": "SEP 2026", "tilt": -3}
--                   of null als het project geen stempel krijgt.
--
-- De bestaande RLS-policies op public.projects gelden ook voor deze kolommen.

alter table public.projects
  add column if not exists dossier_evidence jsonb not null default '[]'::jsonb,
  add column if not exists dossier_stamp jsonb;

alter table public.projects
  add constraint projects_dossier_evidence_is_array
  check (jsonb_typeof(dossier_evidence) = 'array');
