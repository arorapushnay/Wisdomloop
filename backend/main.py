from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
import os
import boto3
from botocore.exceptions import BotoCoreError, NoCredentialsError
import openai
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# S3 config (use environment variables in production)
S3_BUCKET = os.getenv("S3_BUCKET", "wisdomloop-dev")
S3_REGION = os.getenv("S3_REGION", "us-east-1")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "minioadmin")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "minioadmin")
S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:9000")  # For local MinIO or S3-compatible

s3 = boto3.client(
    "s3",
    region_name=S3_REGION,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY,
    endpoint_url=S3_ENDPOINT,
)

# --- OAuth2 Scaffolding ---
config = Config('.env')
oauth = OAuth(config)

oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID', ''),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET', ''),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

oauth.register(
    name='apple',
    client_id=os.getenv('APPLE_CLIENT_ID', ''),
    client_secret=os.getenv('APPLE_CLIENT_SECRET', ''),
    server_metadata_url='https://appleid.apple.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email name'}
)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"message": "Wisdomloop backend is running (MVP stub)"}

@app.post("/upload")
async def upload_content(file: UploadFile = File(...)):
    try:
        s3.upload_fileobj(file.file, S3_BUCKET, file.filename)
        url = f"{S3_ENDPOINT}/{S3_BUCKET}/{file.filename}"
        return {"status": "uploaded", "filename": file.filename, "url": url}
    except (BotoCoreError, NoCredentialsError) as e:
        raise HTTPException(status_code=500, detail=f"S3 upload failed: {str(e)}")

@app.post("/transcribe")
def transcribe_content(filename: str):
    # In a real app, use the filename to find the file and transcribe it
    return {"transcript": f"This is a mock transcript for {filename}."}

@app.post("/chunk")
def chunk_content():
    return {"chunks": ["Chunk 1 (mock)", "Chunk 2 (mock)"]}

@app.post("/repurpose")
def repurpose_content():
    return {"assets": ["Vertical video (mock)", "Tweet (mock)", "Quote (mock)"]}

@app.post("/schedule")
def schedule_content():
    return {"status": "scheduled (mock)"}

@app.post("/schedule/tiktok")
def schedule_tiktok(content_url: str = Form(...), caption: str = Form("")):
    # Mocked TikTok scheduling endpoint
    # In production, this would authenticate and post to TikTok's API
    return {
        "status": "scheduled (mock)",
        "platform": "tiktok",
        "content_url": content_url,
        "caption": caption
    }

@app.get("/analytics")
def get_analytics():
    return {"views": 123, "engagement": 45, "best_performer": "Asset 1 (mock)"}

@app.post("/brand-style")
async def upload_brand_style(file: UploadFile = File(...), description: str = Form("")):
    file_location = os.path.join(UPLOAD_DIR, f"brand_{file.filename}")
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return {"status": "brand style uploaded", "filename": file.filename, "description": description}

@app.post("/invite")
def invite_user(email: str = Form(...)):
    # Mock invite system
    return {"status": f"Invite sent to {email} (mock)"}

@app.post("/ab-test")
def ab_test(variants: list = Form(...)):
    # Mock A/B test winner selection
    return {"winner": variants[0] if variants else None, "status": "A/B test complete (mock)"}

@app.post("/train-model")
async def train_model(file: UploadFile = File(...)):
    # Mock model training
    return {"status": f"Model training started for {file.filename} (mock)"}

@app.post("/sdk-key")
def create_sdk_key():
    # Mock SDK key generation
    return {"key": "mock-sdk-key-1234"}

@app.get("/compliance")
def get_compliance():
    # Mock compliance status
    return {"status": "Compliant (mock)", "copyright": "Clear (mock)", "moderation": "No issues (mock)"}

@app.get("/enterprise")
def get_enterprise():
    # Mock SSO, billing, and support
    return {"sso": "Enabled (mock)", "billing": "Active (mock)", "support": "Priority (mock)"}

@app.post("/chatgpt")
def chatgpt(prompt: str):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return {"response": response.choices[0].message["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/login/{provider}')
async def login(request: Request, provider: str):
    redirect_uri = request.url_for('auth', provider=provider)
    return await oauth.create_client(provider).authorize_redirect(request, redirect_uri)

@app.route('/auth/{provider}')
async def auth(request: Request, provider: str):
    token = await oauth.create_client(provider).authorize_access_token(request)
    user = await oauth.create_client(provider).parse_id_token(request, token)
    # Here you would create/find the user in your DB and issue a session/JWT
    return JSONResponse({"user": user, "token": token})
