import os
from dotenv import load_dotenv

from chimoney import Chimoney


load_dotenv()

chimoney = Chimoney.set_api_key(os.getenv('CHIMONEY_API_KEY'))